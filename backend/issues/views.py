from .models import Issue, Comment, Upvote, Downvote, MediaContent, Alerts
from .serializers import IssueSerializer, CommentSerializer
from users.models import CustomUser

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication


class IssuesListAPIView(APIView):
    """
    All Issues APIView
    URL: GET /issues/
    """

    def get(self, request: Request):
        issues = Issue.objects.all()
        serializer = IssueSerializer(issues, many=True)
        return Response(serializer.data)


class IssuesAPIView(APIView):
    """
    All Issues APIView
    URL: POST /issues/
    URL: PUT /issues/
    URL: DELETE /issues/<int:id>/
    """
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request: Request):
        serializer = IssueSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request: Request):
        serializer = IssueSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, id: int):
        issue = Issue.objects.get(id=id)
        issue.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class CommentsListAPIView(APIView):
    """
    All Comments APIView
    URL: GET /comments/
    """
    def get(self, request: Request):
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)


class CommentAPIView(APIView):
    """
    All Comments APIView
    URL: POST /comments/
    URL: PUT /comments/
    URL: DELETE /comments/<int:id>/
    """
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request: Request):
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request: Request):
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, id: int):
        comment = Comment.objects.get(id=id)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
