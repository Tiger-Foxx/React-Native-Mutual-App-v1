from rest_framework import serializers
from .models import Session

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'

class FondSocialSerializer(serializers.Serializer):
    exercice_id = serializers.IntegerField()
    fonds_social = serializers.IntegerField()

class TresorerieSerializer(serializers.Serializer):
    exercice_id = serializers.IntegerField()
    tresorerie = serializers.IntegerField()