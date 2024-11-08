from rest_framework import serializers
from .models import Obligatory_Contribution

class Obligatory_ContributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Obligatory_Contribution
        fields = '__all__'