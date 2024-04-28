from job.models import WorkType
from rest_framework import serializers


class WorkTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WorkType
        fields = [
            'id', 'name'
        ]


__all__ = [
    'WorkTypeSerializer'
]
