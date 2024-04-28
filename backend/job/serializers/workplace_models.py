from job.models import WorkplaceModel
from rest_framework import serializers


class WorkplaceModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WorkplaceModel
        fields = [
            'id', 'name'
        ]


__all__ = [
    'WorkplaceModelSerializer'
]
