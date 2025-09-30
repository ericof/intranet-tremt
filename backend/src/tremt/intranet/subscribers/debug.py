from tremt.intranet import logger

import os


def log_event(event: object):
    """Log any event."""
    if os.environ.get("DEBUG"):
        module_name = event.__class__.__module__
        class_name = event.__class__.__name__
        dotted_name = f"{module_name}.{class_name}"
        logger.info(f"Evento disparado: {dotted_name}")
