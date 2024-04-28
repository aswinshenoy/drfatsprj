from typing import Optional, Tuple

from boto3 import client
from botocore.config import Config
from django.conf import settings
from uuid import uuid4


class S3Helper:

    def __init__(self, defaultBasePath: str = "uploads/"):
        self.bucket_name = settings.S3_STORAGE_BUCKET_NAME
        self.provider = settings.STORAGE_PROVIDER
        self.defaultBasePath = defaultBasePath
        if self.provider == 'S3':
            endpoint = f"https://s3.{settings.S3_REGION_NAME}.amazonaws.com"
            self.s3 = client(
                's3',
                region_name=settings.S3_REGION_NAME,
                endpoint_url=endpoint,
                config=Config(signature_version='v4', region_name=settings.S3_REGION_NAME)
            )
        elif self.provider == 'DO':
            endpoint = f"https://{settings.S3_REGION_NAME}.digitaloceanspaces.com"
            self.s3 = client(
                's3',
                region_name=settings.S3_REGION_NAME,
                endpoint_url=endpoint,
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            )

    def get_bucket_url(self) -> str:
        if settings.S3_CDN_ENDPOINT and len(settings.S3_CDN_ENDPOINT) > 0:
            return settings.S3_CDN_ENDPOINT
        if self.provider == 'S3':
            return f'https://{self.bucket_name}.s3.amazonaws.com'
        elif self.provider == 'DO':
            return f'https://{self.bucket_name}.{settings.S3_REGION_NAME}.digitaloceanspaces.com'

    def get_public_url(
        self,
        name: str = None,
        path: str = None,
        forceDownload: bool = False
    ) -> Optional[str]:
        if path is None:
            path = self.defaultBasePath
        if forceDownload:
            if name is None:
                return f'{self.get_bucket_url()}/{path}{name}?response-content-disposition=attachment'
            return f'{self.get_bucket_url()}/{path}{name}?response-content-disposition=attachment; filename="{name}"'  # noqa : E501
        return f'{self.get_bucket_url()}/{path}{name}'  # noqa : E501

    def get_signed_url(
        self,
        path: str,
        name: str = None,
        forceDownload: bool = False
    ) -> Optional[str]:
        params = {
            'Bucket': self.bucket_name,
            'Key': path,
        }
        if forceDownload:
            if name is None:
                params['ResponseContentDisposition'] = 'attachment',
            params['ResponseContentDisposition'] = f'attachment; filename="{name}"',
        try:
            return self.s3.generate_presigned_url(
                ClientMethod='get_object',
                Params=params,
                ExpiresIn=3600
            )
        except Exception as _e:
            print(_e)
            return None

    @staticmethod
    def generate_file_name(name) -> str:
        if '.' in name:
            ext = name.split(".", 1)[1]
            fn = name.split(".")[0]
            return "%s_%s.%s" % (fn, uuid4(), ext)
        else:
            return "%s_%s" % (name, uuid4())

    def get_upload_url(
        self,
        name: str,
        contentType: str,
        basePath: str = None,
        public: bool = False,
        forceDownload: bool = False
    ) -> Optional[Tuple]:
        generated_name = self.generate_file_name(name=name)
        if basePath is None:
            basePath = self.defaultBasePath
        params = {
            'Bucket': self.bucket_name,
            'Key': f"{basePath}{generated_name}",
            'ContentType': contentType,
        }
        if public:
            params['ACL'] = 'public-read'
        if forceDownload:
            params['ContentDisposition'] = f'attachment; filename="{name}"'
        url = self.s3.generate_presigned_url(
            ClientMethod='put_object',
            Params=params,
            ExpiresIn=3600,
        )
        return url, generated_name

    def make_file_public(self, path: str) -> None:
        self.s3.put_object_acl(
            ACL='public-read',
            Bucket=self.bucket_name,
            Key=path
        )

    def delete_file(self, path: str) -> None:
        self.s3.delete_object(
            Bucket=self.bucket_name,
            Key=path
        )


__all__ = [
    'S3Helper'
]
