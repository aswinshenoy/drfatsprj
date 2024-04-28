from application.models import Candidate
from rest_framework import serializers

from job.serializers.skill import SkillSerializer


class CandidateSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    skills = SkillSerializer(many=True, required=False)
    age = serializers.SerializerMethodField()

    class Meta:
        model = Candidate
        fields = [
            'id', 'firstName', 'lastName', 'email', 'phone', 'gender', 'age',
            'dateOfBirth', 'expectedSalary', 'currentSalary', 'currentLocation',
            'currentCompany', 'resumePath', 'monthsOfExperience', 'skills'
        ]

    def get_age(self, obj):
        if obj.dateOfBirth:
            from django.utils import timezone
            return (timezone.now().date() - obj.dateOfBirth).days // 365
        return None


__all__ = [
    'CandidateSerializer'
]
