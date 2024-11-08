from rest_framework import serializers
from sessions_.models import Session
from obligatory_contributions.models import Obligatory_Contribution
from helps.models import Help
from savings.models import Saving

class FondSocialSerializer(serializers.Serializer):
    exercice_id = serializers.IntegerField()
    fonds_social = serializers.IntegerField()

class TresorerieSerializer(serializers.Serializer):
    exercice_id = serializers.IntegerField()
    tresorerie = serializers.IntegerField()