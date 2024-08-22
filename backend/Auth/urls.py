from django.urls import path
from .views import UserRegisterAPIView, UserLoginAPIView
from .views import UsersAPIView, UserUpdatePasswordAPIView, UserLogoutAPIView

urlpatterns = [
    path("users/", UsersAPIView.as_view()),
    path("users/<int:pk>/", UsersAPIView.as_view()),
    path("register/", UserRegisterAPIView.as_view()),
    path("update-password/", UserUpdatePasswordAPIView.as_view()),
    path("login/", UserLoginAPIView.as_view()),
    path("logout/", UserLogoutAPIView.as_view()),
]
