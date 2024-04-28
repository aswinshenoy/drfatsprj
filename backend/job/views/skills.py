from rest_framework.generics import ListAPIView

from ats.utils.rest import PaginationConfig
from job.models import Skill
from job.serializers import SkillSerializer


class SkillsAPI(ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    pagination_class = PaginationConfig

    def get_queryset(self):
        qs = super().get_queryset()
        if 'keyword' in self.request.GET:
            keyword = self.request.GET['keyword']
            return qs.filter(name__icontains=keyword)
        return qs


__all__ = [
    'SkillsAPI'
]

