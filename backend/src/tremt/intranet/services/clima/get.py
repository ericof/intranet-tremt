from plone import api
from plone.restapi.services import Service
from Products.CMFPlone.Portal import PloneSite
from tremt.intranet import logger
from tremt.intranet.services.clima import openmeteo


class ClimaGet(Service):
    @property
    def coordinates(self) -> tuple[float, float]:
        """Retorna latitude e longitude do TRE-MT."""
        return (-15.56358997333098, -56.063925464981914)

    @property
    def timezone(self) -> str:
        return api.portal.get_registry_record("plone.portal_timezone")

    def reply(self) -> dict:
        portal: PloneSite = api.portal.get()
        portal_url = portal.absolute_url()
        latitude, longitude = self.coordinates
        timezone = self.timezone
        logger.info("Acessa dados do clima")
        dados = openmeteo.dados_clima(latitude, longitude, timezone)
        dados["@id"] = f"{portal_url}/@clima"
        logger.info("Retorna dados do clima")
        return dados
