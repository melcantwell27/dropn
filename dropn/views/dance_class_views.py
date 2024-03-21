# # dropn/views/danceClassViews.py

# from ..models import DanceClass
# from ..serializers import DanceClassSerializer
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework import status
# from django.views.decorators.csrf import csrf_exempt
# from rest_framework.permissions import IsAuthenticated

# @csrf_exempt
# @api_view(['GET', 'POST'])
# def dance_class_list(request):
#     if request.method == "GET":
#         classes = DanceClass.objects.all()
#         serializer = DanceClassSerializer(classes, many=True)
#         return Response(serializer.data)

#     elif request.method == "POST":
#         serializer = serializer = DanceClassSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# @csrf_exempt
# # @permission_classes([IsAuthenticated])
# @api_view(['GET', 'PUT', 'DELETE', 'POST'])
# def dance_class_detail(request, pk):
#     try:
#         dance_class = DanceClass.objects.get(pk=pk)
#     except DanceClass.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = DanceClassSerializer(dance_class)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = DanceClassSerializer(dance_class, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         dance_class.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

#     elif request.method == 'POST':
#         # Cancel sign-up for the class
#         user = request.user
#         if user in dance_class.students.all():
#             dance_class.students.remove(user)
#             return Response({'message': 'Sign-up canceled successfully'}, status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'You are not signed up for this class'}, status=status.HTTP_400_BAD_REQUEST)


# @csrf_exempt
# # @permission_classes([IsAuthenticated])
# @api_view(['GET'])
# def get_user_dance_classes(request):
#     user = request.user
    
#     if user.is_student:
#         classes = DanceClass.objects.filter(students=user)
#     elif user.is_teacher:
#         classes = DanceClass.objects.filter(teacher=user)
#     else:
#         classes = DanceClass.objects.none()

#     serializer = DanceClassSerializer(classes, many=True)
#     return Response(serializer.data)

# # @permission_classes([IsAuthenticated])
# @api_view(['GET'])
# def enroll(request, id):
#     try:
#         user = request.user

#         dance_class = DanceClass.objects.get(pk=id)

#         dance_class.students.add(user)
      
#         dance_class.save()
        
#         return Response({'message': f'Enrolled in {dance_class.class_name} successfully'}, status=status.HTTP_200_OK)
#     except DanceClass.DoesNotExist:
#         return Response({'error': 'Dance class not found'}, status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# # @permission_classes([IsAuthenticated])
# @api_view(['GET'])
# def unenroll(request, id):
#     try:
#         user = request.user
        
#         dance_class = DanceClass.objects.get(pk=id)
        
#         dance_class.students.remove(user)
        
#         dance_class.save()
        
#         return Response({'message': f'Unenrolled from {dance_class.class_name} successfully'}, status=status.HTTP_200_OK)
#     except DanceClass.DoesNotExist:
#         return Response({'error': 'Dance class not found'}, status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# # @permission_classes([IsAuthenticated])
# @api_view(['POST'])
# def create_class(request):
#     user = request.user
#     if user.is_teacher:
#         class_data = request.data
#         class_data['teacher'] = user
#         serializer = DanceClassSerializer(data=class_data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({'message': 'Dance class created successfully'}, status=status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     else:
#         return Response({'error': 'Must be a teacher to create a class'}, status=status.HTTP_403_FORBIDDEN)


# above is for authenticated baddies only!!!! below is chatgbt modified bypassing all authentication ...

from ..models import DanceClass
from ..models import User
from ..serializers import DanceClassSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated


@csrf_exempt
@api_view(['GET', 'POST'])
def dance_class_list(request):
    if request.method == "GET":
        classes = DanceClass.objects.all()
        serializer = DanceClassSerializer(classes, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = serializer = DanceClassSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@csrf_exempt
@permission_classes([IsAuthenticated])
@api_view(['GET', 'PUT', 'DELETE', 'POST'])
def dance_class_detail(request, pk):
    try:
        dance_class = DanceClass.objects.get(pk=pk)
    except DanceClass.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DanceClassSerializer(dance_class)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = DanceClassSerializer(dance_class, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        dance_class.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'POST':
        # Cancel sign-up for the class
        user = request.user
        if user in dance_class.students.all():
            dance_class.students.remove(user)
            return Response({'message': 'Sign-up canceled successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'You are not signed up for this class'}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_user_dance_classes(request):
    user = request.user
   
    if user.is_student:
        classes = DanceClass.objects.filter(students=user)
    elif user.is_teacher:
        classes = DanceClass.objects.filter(teacher=user)
    else:
        classes = DanceClass.objects.none()

    serializer = DanceClassSerializer(classes, many=True)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def enroll(request, id):
    try:
        user = request.user

        # user = User.objects.get(pk=11)

        dance_class = DanceClass.objects.get(pk=id)

        dance_class.students.add(user)
      
        dance_class.save()
        
        return Response({'message': f'Enrolled in {dance_class.class_name} successfully'}, status=status.HTTP_200_OK)
    except DanceClass.DoesNotExist:
        return Response({'error': 'Dance class not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def unenroll(request, id):
    try:
        user = request.user

        # user = User.objects.get(pk=11)
        
        dance_class = DanceClass.objects.get(pk=id)
        
        dance_class.students.remove(user)
        
        dance_class.save()
        
        return Response({'message': f'Unenrolled from {dance_class.class_name} successfully'}, status=status.HTTP_200_OK)
    except DanceClass.DoesNotExist:
        return Response({'error': 'Dance class not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# @permission_classes([IsAuthenticated])
@api_view(['POST'])
def create_class(request):
    user = request.user
    if user.is_teacher:
        class_data = request.data
        class_data['teacher'] = user
        serializer = DanceClassSerializer(data=class_data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Dance class created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Must be a teacher to create a class'}, status=status.HTTP_403_FORBIDDEN)

@api_view(['DELETE'])
def delete_class(request, pk):
    """
    API endpoint to allow teachers to delete a dance class they've created.

    Args:
        pk (int): Primary key of the class to be deleted.

    Returns:
        Response: HTTP response indicating success or failure of class deletion.
    """
    try:
        class_instance = DanceClass.objects.get(pk=pk)
        if request.user == class_instance.teacher:
            class_instance.delete()
            return Response({'message': 'Dance class deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': 'You are not authorized to delete this class'}, status=status.HTTP_403_FORBIDDEN)
    except DanceClass.DoesNotExist:
        return Response({'error': 'Dance class not found'}, status=status.HTTP_404_NOT_FOUND)