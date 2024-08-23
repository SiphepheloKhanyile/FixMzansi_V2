from .models import PublicAlerts
from rest_framework import serializers

class AlertsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicAlerts
        fields = '__all__'
