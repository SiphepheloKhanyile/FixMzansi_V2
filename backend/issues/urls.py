from django.urls import path
from .views import IssuesListUnsecuredAPIView, IssuesAPIView
from .views import CommentsListUnsecuredAPIView, CommentAPIView
from .views import MediaContentListUnsecuredAPIView, MediaContentAPIView
from .views import UpvotesListUnsecuredAPIView, UpvotesListAPIView
from .views import DownvotesListUnsecuredAPIView, DownvotesListAPIView

urlpatterns = [
    path("", IssuesListUnsecuredAPIView.as_view()),
    path("<int:pk>/", IssuesListUnsecuredAPIView.as_view()),
    path("add/", IssuesAPIView.as_view()),
    path("add/<int:id>/", IssuesAPIView.as_view()),
    
    path("comments/", CommentsListUnsecuredAPIView.as_view()),
    path("comments/<int:pk>/", CommentsListUnsecuredAPIView.as_view()),
    path("comment/", CommentAPIView.as_view()),
    path("comment/<int:id>/", CommentAPIView.as_view()),
    
    path("media/", MediaContentListUnsecuredAPIView.as_view()),
    path("media/<int:pk>/", MediaContentListUnsecuredAPIView.as_view()),
    path("media/add/", MediaContentAPIView.as_view()),
    path("media/delete/<int:id>/", MediaContentAPIView.as_view()),
    
    path("upvotes/", UpvotesListUnsecuredAPIView.as_view()),
    path("upvotes/<int:pk>/", UpvotesListUnsecuredAPIView.as_view()),
    path("upvote/", UpvotesListAPIView.as_view()),
    path("upvote/<int:id>/", UpvotesListAPIView.as_view()),
    
    path("downvotes/", DownvotesListUnsecuredAPIView.as_view()),
    path("downvotes/<int:pk>/", DownvotesListUnsecuredAPIView.as_view()),
    path("downvote/", DownvotesListAPIView.as_view()),
    path("downvote/<int:id>/", DownvotesListAPIView.as_view()),
]
