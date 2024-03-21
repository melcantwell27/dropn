from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models import Studio
from ..serializers import StudioSerializer
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@api_view(['GET', 'POST'])
def studio_list(request):
    """
    Retrieve a list of all studios or create a new studio.
    """
    if request.method == 'GET':
        studios = Studio.objects.all()
        serializer = StudioSerializer(studios, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = StudioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def studio_detail(request, pk):
    """
    Retrieve, update, partially update, or delete a studio by PK.
    """
    try:
        studio = Studio.objects.get(pk=pk)
    except Studio.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = StudioSerializer(studio)
        return Response(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        serializer = StudioSerializer(studio, data=request.data, partial=request.method == 'PATCH')
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        studio.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
