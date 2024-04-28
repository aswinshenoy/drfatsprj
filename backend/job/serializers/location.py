from job.models import Location
from rest_framework import serializers


class LocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Location
        fields = [
            'id', 'name'
        ]


__all__ = [
    'LocationSerializer'
]
