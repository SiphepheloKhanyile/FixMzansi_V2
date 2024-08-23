from .models import PublicAlerts
from .serializers import AlertsSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication


class AlertsAPIView(APIView):
    """
    All Public Alerts APIView
    URL: GET /alerts/
    URL: POST /alerts/
    URL: PUT /alerts/
    URL: DELETE /alerts/<int:id>/
    """
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, pk=None):
        if pk:
            alert = PublicAlerts.objects.get(pk=pk)
            serializer = AlertsSerializer(alert)
            return Response(serializer.data)

        alerts = PublicAlerts.objects.all()
        serializer = AlertsSerializer(alerts, many=True)
        return Response(serializer.data)

    def post(self, request: Request):
        serializer = AlertsSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request: Request):
        serializer = AlertsSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, id: int):
        alert = PublicAlerts.objects.get(id=id)
        alert.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

