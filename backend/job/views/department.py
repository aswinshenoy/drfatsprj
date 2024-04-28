from rest_framework.generics import ListAPIView

from ats.utils.rest import PaginationConfig
from job.models import Department
from job.serializers import DepartmentSerializer


class DepartmentsAPI(ListAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    pagination_class = PaginationConfig

    def get_queryset(self):
        qs = super().get_queryset()
        if 'keyword' in self.request.GET:
            keyword = self.request.GET['keyword']
            return qs.filter(name__icontains=keyword)
        return qs


__all__ = [
    'DepartmentsAPI'
]
