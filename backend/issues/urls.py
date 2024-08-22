from django.urls import path
from .views import IssuesListAPIView, IssuesAPIView

urlpatterns = [
    path("", IssuesListAPIView.as_view()),
    path("add/", IssuesAPIView.as_view()),
    path("add/<int:id>/", IssuesAPIView.as_view()),
]

