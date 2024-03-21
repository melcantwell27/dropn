from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from ..forms.user_registration import UserRegistrationForm
from ..serializers import UserRegistrationSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..serializers import UserRegistrationSerializer
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = UserRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST', 'GET'])
def user_login(request):
    if request.method == 'POST':
        # Parse JSON data from request body
        data = JSONParser().parse(request)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            # Set username in session data
            request.session['username'] = username
            request.session['userId'] = user.id
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
def user_logout(request):
    if request.method == 'POST':
        user = request.user
        print(user)
        if user.is_authenticated:
            logout(request)
            return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    
@api_view(['GET'])
def check_user_logged_in(request):
    if request.user.is_authenticated:
        return Response({'loggedIn': True}, status=status.HTTP_200_OK)
    else:
        return Response({'loggedIn': False}, status=status.HTTP_200_OK)