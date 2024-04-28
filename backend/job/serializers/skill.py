from job.models import Skill
from rest_framework import serializers


class SkillSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Skill
        fields = [
            'id', 'name'
        ]


__all__ = [
    'SkillSerializer'
]
