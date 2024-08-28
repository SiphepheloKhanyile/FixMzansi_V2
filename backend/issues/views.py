from .models import Issue, Comment, Upvote, Downvote, MediaContent
from .serializers import IssueSerializer, CommentSerializer, UpvoteSerializer, DownvoteSerializer, MediaContentSerializer
from users.models import CustomUser

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication

from django.db.models import Q

class IssuesListUnsecuredAPIView(APIView):
    """
    All Issues APIView
    URL: GET /issues/
    """
    def get(self, request: Request, pk=None):
        state_name = request.query_params.get('state')
        category = request.query_params.get('category')
        status = request.query_params.get('status')
        
        if pk:
            issue = Issue.objects.get(pk=pk)
            serializer = IssueSerializer(issue)
            return Response(serializer.data)
        
        query = Q()
        
        if state_name:
            query |= Q(state_name=state_name)
        if category:
            query |= Q(category=category)
        if status:
            query |= Q(status=status)
        
        if query:
            issues = Issue.objects.filter(query)
        else:
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
    

class CommentsListUnsecuredAPIView(APIView):
    """
    All Comments APIView
    URL: GET /comments/
    """
    def get(self, request: Request, pk=None):
        if pk:
            comment = Comment.objects.get(pk=pk)
            serializer = CommentSerializer(comment)
            return Response(serializer.data)
        
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
    

class MediaContentListUnsecuredAPIView(APIView):
    """
    All MediaContent APIView
    URL: GET /mediacontent/
    """
    def get(self, request: Request, pk=None):
        issue_id = request.query_params.get('issue')
        issue_image_id = request.query_params.get('issue_image_id')
        
        if issue_id:
            mediacontents = MediaContent.objects.filter(issue_id=issue_id)
            serializer = MediaContentSerializer(mediacontents, many=True)
            return Response(serializer.data)
        
        if issue_image_id:
            mediacontent = MediaContent.objects.filter(issue=issue_image_id).first()
            serializer = MediaContentSerializer(mediacontent)
            return Response(serializer.data)
        
        if pk:
            mediacontent = MediaContent.objects.get(pk=pk)
            serializer = MediaContentSerializer(mediacontent)
            return Response(serializer.data)
        
        mediacontents = MediaContent.objects.all()
        serializer = MediaContentSerializer(mediacontents, many=True)
        return Response(serializer.data)
    

class MediaContentAPIView(APIView):
    """
    All MediaContent APIView
    URL: POST /mediacontent/
    URL: PUT /mediacontent/
    URL: DELETE /mediacontent/<int:id>/
    """
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request: Request):
        files = request.FILES.getlist('files')
        issue_id = request.data.get('issue')
        media_contents = []

        for file in files:
            media_content = MediaContent(file=file, issue_id=issue_id)
            media_contents.append(media_content)

        MediaContent.objects.bulk_create(media_contents)
        serializer = MediaContentSerializer(media_contents, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request: Request):
        files = request.FILES.getlist('files')
        issue_id = request.data.get('issue')
        media_contents = []

        for file in files:
            media_content = MediaContent(file=file, issue_id=issue_id)
            media_contents.append(media_content)

        MediaContent.objects.bulk_create(media_contents)
        serializer = MediaContentSerializer(media_contents, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request: Request, id: int):
        try:
            mediacontent = MediaContent.objects.get(id=id)
            mediacontent.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except MediaContent.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class UpvotesListUnsecuredAPIView(APIView):
    """
    All Upvotes APIView
    URL: GET /upvotes/
    """
    def get(self, request: Request, issue_id=None):
        if issue_id:
            upvotes = Upvote.objects.filter(issue_id=issue_id)
            serializer = UpvoteSerializer(upvotes, many=True)
            return Response(serializer.data)
        
        upvotes = Upvote.objects.all()
        serializer = UpvoteSerializer(upvotes, many=True)
        return Response(serializer.data)
    


class UpvotesListAPIView(APIView):
    """
    All Upvotes APIView
    URL: POST /upvotes/
    URL: DELETE /upvotes/<int:id>/
    """
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request: Request):
        serializer = UpvoteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request: Request, id: int):
        upvote = Upvote.objects.get(id=id)
        upvote.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DownvotesListUnsecuredAPIView(APIView):
    """
    All Downvotes APIView
    URL: GET /downvotes/
    """
    def get(self, request: Request, issue_id=None):
        if issue_id:
            downvotes = Downvote.objects.filter(issue_id=issue_id)
            serializer = DownvoteSerializer(downvotes, many=True)
            return Response(serializer.data)
        
        downvotes = Downvote.objects.all()
        serializer = DownvoteSerializer(downvotes, many=True)
        return Response(serializer.data)


class DownvotesListAPIView(APIView):
    """
    All Downvotes APIView
    URL: POST /downvotes/
    URL: DELETE /downvotes/<int:id>/
    """
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request: Request):
        serializer = DownvoteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request: Request, id: int):
        downvote = Downvote.objects.get(id=id)
        downvote.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
