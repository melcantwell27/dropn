from rest_framework import serializers
from ..models import Studio

class StudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studio
        fields = ['id', 'name', 'location', 'teachers']
