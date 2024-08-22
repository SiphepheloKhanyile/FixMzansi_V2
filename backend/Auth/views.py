"""
This file contains all the APIViews for the Auth app.
"""
from .serializers import UserLoginSerializer, UserRegisterSerializer, CustomUserSerializer
from .serializers import  UserUpdateSerializer, UserUpdatePasswordSerializer
from users.models import CustomUser

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication

from rest_framework.exceptions import ValidationError
from rest_framework.authtoken.models import Token


class UsersAPIView(APIView):
    """
    All Users APIView
    URL: GET /auth/users/
    URL: PUT /auth/users/<int:pk>/
    URL: DELETE /auth/users/<int:pk>/
    """
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, pk=None):
        if pk:
            try:
                user = CustomUser.objects.get(pk=pk)
            except CustomUser.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            serializer = CustomUserSerializer(user)
            return Response(serializer.data)

        users = CustomUser.objects.all()
        serializer = CustomUserSerializer(users, many=True)
        return Response(serializer.data)

    def put(self, request: Request, pk=None):
        user: CustomUser = request.user
        serializer = UserUpdateSerializer(user, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, pk=None):
        user: CustomUser = request.user
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserRegisterAPIView(APIView):
    """
    User Register APIView
    URL: /auth/register/
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
    URL: /auth/login/
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


class UserLogoutAPIView(APIView):
    """
    User Logout APIView
    URL: /auth/logout/
    """
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request: Request, *args, **kargs):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class UserUpdatePasswordAPIView(APIView):
    """
    User Update Password APIView
    URL: /auth/update-password/
    """
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request: Request, *args, **kwargs):
        serializer = UserUpdatePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user: CustomUser = request.user

            if not user.check_password(request.data['old_password']):
                return Response({"detail": "Invalid old password"}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(request.data['new_password'])
            user.save()
            return Response({"detail": "Password updated successfully"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
