from pathlib import Path
from Products.CMFPlone.Portal import PloneSite

import json
import pytest


LOCAL_PATH = Path(__file__).parent


@pytest.fixture(scope="session")
def openmeteo_response() -> dict:
    raw_data = (LOCAL_PATH / "openmeteo.json").read_text()
    return json.loads(raw_data)


@pytest.fixture
def patch_openmeteo(monkeypatch, openmeteo_response):
    from tremt.intranet.services.clima import openmeteo

    def mockreturn(params: dict[str, str | float]) -> dict:
        return openmeteo_response

    monkeypatch.setattr(openmeteo, "_obtem_dados_open_meteo", mockreturn)


class TestServiceClimaGet:
    portal: PloneSite

    @pytest.fixture(autouse=True)
    def _setup(self, portal, patch_openmeteo):
        self.portal = portal
        self.endpoint = "/@clima"

    def test_get_status_code(self, manager_request):
        response = manager_request.get(self.endpoint)
        assert response.status_code == 200

    def test_anonymous_access(self, anon_request):
        response = anon_request.get(self.endpoint)
        assert response.status_code == 401

    @pytest.mark.parametrize(
        "key,expected",
        [
            ["@id", True],
            ["events", True],
            ["temperature", True],
            ["weather", True],
        ],
    )
    def test_get_keys(self, manager_request, key: str, expected: bool):
        response = manager_request.get(self.endpoint)
        data = response.json()
        assert (key in data) is expected
