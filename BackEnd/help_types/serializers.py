from rest_framework import serializers
from .models import Help_Type

class HelpTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Help_Type
        fields = '__all__'