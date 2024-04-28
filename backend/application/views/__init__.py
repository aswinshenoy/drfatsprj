from django.http import JsonResponse, HttpResponse
from django.db import models
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

from application.models import Candidate
from application.serializers import CandidateSerializer

from .application import submit_application, ApplicationsAPI, update_application_status


@csrf_exempt
def candidates_api(request):

    if request.method == 'GET':
        canidates = Candidate.objects.all()

        # check query params
        if 'keyword' in request.GET:
            keyword = request.GET['keyword']
            canidates = canidates.filter(
                models.Q(firstName__icontains=keyword) |
                models.Q(lastName__icontains=keyword) |
                models.Q(email__icontains=keyword) |
                models.Q(phone__icontains=keyword)
            )

        serializer = CandidateSerializer(canidates, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CandidateSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def candidate_api(request, pk):
    try:
        candidate = Candidate.objects.get(pk=pk)
    except Candidate.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = CandidateSerializer(candidate)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = CandidateSerializer(candidate, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)


__all__ = [
    'candidates_api',
    'candidate_api',
    'submit_application',
    'update_application_status',
    'ApplicationsAPI',
]
