from rest_framework.fields import SerializerMethodField
from rest_framework.relations import PrimaryKeyRelatedField

from application.models import Application, Candidate
from rest_framework import serializers

from job.models import Job
from job.serializers import JobListingSerializer
from .candidate import CandidateSerializer


class ApplicationSubmitSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    job = PrimaryKeyRelatedField(queryset=Job.objects.all())
    candidate = CandidateSerializer()

    def create(self, validated_data):
        candidate_data = validated_data.pop('candidate')
        candidate = Candidate.objects.create(**candidate_data)
        application = Application.objects.create(candidate=candidate, **validated_data)
        return application

    class Meta:
        model = Application
        fields = [
            'id', 'job', 'candidate', 'formData', 'source'
        ]


class ApplicationSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    job = JobListingSerializer()
    candidate = CandidateSerializer()
    statusText = SerializerMethodField()

    class Meta:
        model = Application
        fields = [
            'id', 'job', 'candidate', 'formData', 'status', 'statusText'
        ]

    def get_statusText(self, obj):
        if obj and obj.status == 0:
            return 'Rejected'
        elif obj and obj.status == 1:
            return 'Accepted'
        elif obj and obj.status == 9:
            return 'Applied'


class ApplicationStatusSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True, required=False)

    class Meta:
        model = Application
        fields = [
            'id', 'status'
        ]


__all__ = [
    'ApplicationSubmitSerializer',
    'ApplicationSerializer',
    'ApplicationStatusSerializer'
]
