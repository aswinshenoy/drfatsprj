from job.models import Department
from rest_framework import serializers


class DepartmentSerializer(serializers.HyperlinkedModelSerializer):
    parent = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), required=False)

    class Meta:
        model = Department
        fields = [
            'id', 'name', 'parent', 'hasJobs',
        ]


__all__ = [
    'DepartmentSerializer'
]
