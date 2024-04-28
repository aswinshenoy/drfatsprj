from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from job.models import Job
from job.serializers import JobListingSerializer, JobSerializer


@csrf_exempt
def jobs_api(request):

    if request.method == 'GET':
        jobs = Job.objects.all()

        if 'keyword' in request.GET:
            keyword = request.GET['keyword']
            jobs = jobs.filter(title__icontains=keyword)

        if 'location' in request.GET:
            location = request.GET['location']
            jobs = jobs.filter(location__id=location)

        if 'department' in request.GET:
            department = request.GET['department']
            jobs = jobs.filter(department__id=department)

        serializer = JobListingSerializer(jobs, many=True)
        return JsonResponse(serializer.data, safe=False)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
def job_api(request, jobID: str):
    if request.method == 'GET':
        try:
            job = Job.objects.get(jobID=jobID)
        except Job.DoesNotExist:
            return JsonResponse({'error': 'Job not found'}, status=404)

        serializer = JobSerializer(job)
        return JsonResponse(serializer.data)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


__all__ = [
    'jobs_api',
    'job_api'
]

