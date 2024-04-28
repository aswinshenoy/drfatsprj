from django.db.models import Q
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank

from application.models import Application
from application.serializers import ApplicationSubmitSerializer, ApplicationSerializer, ApplicationStatusSerializer

from rest_framework.generics import ListAPIView

from ats.utils.rest import PaginationConfig


class ApplicationsAPI(ListAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    pagination_class = PaginationConfig

    def get_queryset(self):
        qs = super().get_queryset()

        if 'keyword' in self.request.GET:
            keyword = self.request.GET['keyword']
            vector = SearchVector('candidate__firstName', 'candidate__lastName')
            query = SearchQuery(keyword)

            keywords = keyword.split()
            qf = Q()
            for word in keywords:
                qf |= (Q(candidate__firstName__icontains=word)
                       | Q(candidate__lastName__icontains=word)
                       | Q(candidate__email__istartswith=word)
                       | Q(candidate__phone__istartswith=word))

            qs = qs.filter(qf).annotate(
                rank=SearchRank(vector, query)
            )

        if 'minExperience' in self.request.GET and self.request.GET['minExperience']:
            qs = qs.filter(candidate__monthsOfExperience__gte=int(self.request.GET['minExperience']))

        if 'maxExperience' in self.request.GET and self.request.GET['maxExperience']:
            qs = qs.filter(candidate__monthsOfExperience__lt=int(self.request.GET['maxExperience']))

        if 'minAge' in self.request.GET and self.request.GET['minAge']:
            minAgeDate = timezone.now().date() - timezone.timedelta(days=int(self.request.GET['minAge']) * 365)
            qs = qs.filter(candidate__dateOfBirth__lte=minAgeDate)

        if 'maxAge' in self.request.GET and self.request.GET['maxAge']:
            maxAgeDate = timezone.now().date() - timezone.timedelta(days=int(self.request.GET['maxAge']) * 365)
            qs = qs.filter(candidate__dateOfBirth__gte=maxAgeDate)

        if 'minSalaryExpected' in self.request.GET and self.request.GET['minSalaryExpected']:
            qs = qs.filter(candidate__expectedSalary__gte=int(self.request.GET['minSalaryExpected']))

        if 'maxSalaryExpected' in self.request.GET and self.request.GET['maxSalaryExpected']:
            qs = qs.filter(candidate__expectedSalary__lt=int(self.request.GET['maxSalaryExpected']))

        if 'keyword' in self.request.GET:
            qs = qs.order_by('-rank')
        else:
            qs = qs.order_by('-id')

        return qs


@csrf_exempt
def submit_application(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ApplicationSubmitSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)

        return JsonResponse(serializer.errors, status=400)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
def update_application_status(request, id):
    if request.method == 'POST':
        try:
            application = Application.objects.get(id=id)
        except Application.DoesNotExist:
            return JsonResponse({'error': 'Application not found'}, status=404)

        data = JSONParser().parse(request)
        serializer = ApplicationStatusSerializer(data=data)
        if not serializer.is_valid():
            return JsonResponse(serializer.errors, status=400)

        application.status = serializer.validated_data['status']
        application.save()

        return JsonResponse({'status': 'success'}, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


__all__ = [
    'ApplicationsAPI',
    'submit_application',
    'update_application_status'
]
