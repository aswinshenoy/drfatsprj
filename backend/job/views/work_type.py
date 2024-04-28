from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from job.models import WorkType
from job.serializers import WorkTypeSerializer


@csrf_exempt
def worktypes_api(request):

    if request.method == 'GET':
        types = WorkType.objects.all()

        if 'keyword' in request.GET:
            keyword = request.GET['keyword']
            types = types.filter(name__icontains=keyword)

        serializer = WorkTypeSerializer(types, many=True)
        return JsonResponse(serializer.data, safe=False)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


__all__ = [
    'worktypes_api'
]

