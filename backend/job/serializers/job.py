from job.models import Job
from rest_framework import serializers

from .location import LocationSerializer
from .department import DepartmentSerializer
from .skill import SkillSerializer
from .workplace_models import WorkplaceModelSerializer
from .worktypes import WorkTypeSerializer


class JobListingSerializer(serializers.HyperlinkedModelSerializer):
    locations = LocationSerializer(many=True, read_only=True)
    department = DepartmentSerializer(read_only=True)
    workplaceModels = WorkplaceModelSerializer(many=True, read_only=True)
    workType = WorkTypeSerializer(read_only=True)
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Job
        fields = [
            'id', 'title', 'jobID', 'locations', 'department',
            'workplaceModels', 'workType', 'minExperienceYears', 'idealExperienceYears',
            'skills', 'timestampPosted',
        ]


class JobSerializer(JobListingSerializer):

    class Meta:
        model = Job
        fields = JobListingSerializer.Meta.fields + [
            'description', 'formSections',
        ]


__all__ = [
    'JobListingSerializer',
    'JobSerializer'
]
