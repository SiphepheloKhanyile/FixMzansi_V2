from django.urls import path
from .views import UserRegisterAPIView, UserLoginAPIView

urlpatterns = [
    path("register/", UserRegisterAPIView.as_view()),
    path("login/", UserLoginAPIView.as_view()),
]
