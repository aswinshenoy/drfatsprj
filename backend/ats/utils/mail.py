from typing import Optional

from django.core.mail.backends.smtp import EmailBackend
from django.conf import settings


def get_mail_backend() -> Optional[EmailBackend]:
    if not (
        len(settings.EMAIL_HOST) > 0
        and len(settings.EMAIL_PORT) > 0
        and len(settings.EMAIL_DOMAIN) > 0
        and len(settings.EMAIL_USERNAME) > 0
    ):
        return

    return EmailBackend(
        host=settings.EMAIL_HOST,
        port=settings.EMAIL_PORT,
        username=settings.EMAIL_USERNAME,
        password=settings.EMAIL_PASSWORD,
        use_ssl=settings.EMAIL_USE_SSL,
        use_tls=settings.EMAIL_USE_TLS,
    )


__all__ = [
    'get_mail_backend'
]
