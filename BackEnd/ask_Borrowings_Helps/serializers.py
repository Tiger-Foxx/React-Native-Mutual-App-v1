from rest_framework import serializers
from .models import Ask_Borrowings_Helps

class Ask_Borrowings_HelpsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ask_Borrowings_Helps
        fields = '__all__'