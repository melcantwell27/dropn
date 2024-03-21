from rest_framework import serializers
from ..models import DanceClass

class DanceClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = DanceClass
        fields = '__all__'
        