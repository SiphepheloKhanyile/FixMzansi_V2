from .serializers import UserLoginSerializer, UserRegisterSerializer, CustomUserSerializer
from users.models import CustomUser

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.request import Request

from rest_framework.exceptions import ValidationError
from rest_framework.authtoken.models import Token


class UserRegisterAPIView(APIView):
    """
    User Register APIView
    URL: /auth/register
    """
    def post(self, request: Request, *args, **kargs):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            token = Token.objects.get(user=CustomUser.objects.get(
                username=serializer.data['username']))

            user = CustomUser.objects.get(username=serializer.data['username'])
            user_serializer = CustomUserSerializer(user)

            response = {
                **user_serializer.data,
                "accessToken": token.key
            }
            return Response(response, status=status.HTTP_200_OK)
        raise ValidationError(
            serializer.errors, code=status.HTTP_406_NOT_ACCEPTABLE)


class UserLoginAPIView(APIView):
    """
    User Login APIView
    URL: /auth/login
    """
    def post(self, request: Request, *args, **kargs):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            response = {
                "username": {
                    "detail": "User Does not exist!"
                }
            }
            if CustomUser.objects.filter(username=request.data['username']).exists():
                user = CustomUser.objects.get(
                    username=request.data['username'])

                if user.check_password(request.data['password']):
                    token, created = Token.objects.get_or_create(user=user)
                    user_serializer = CustomUserSerializer(user)
                    response = {
                        **user_serializer.data,
                        "accessToken": token.key
                    }
                    return Response(response, status=status.HTTP_200_OK)
                else:
                    response = {
                        'detail': 'Incorrect password'
                    }
                    return Response(response, status=status.HTTP_400_BAD_REQUEST)
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
