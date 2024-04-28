from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from job.models import WorkplaceModel
from job.serializers import WorkplaceModelSerializer


@csrf_exempt
def workplace_models_api(request):

    if request.method == 'GET':
        models = WorkplaceModel.objects.all()

        if 'keyword' in request.GET:
            keyword = request.GET['keyword']
            models = models.filter(name__icontains=keyword)

        serializer = WorkplaceModelSerializer(models, many=True)
        return JsonResponse(serializer.data, safe=False)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


__all__ = [
    'workplace_models_api'
]

