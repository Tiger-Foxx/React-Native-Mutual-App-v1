from rest_framework import serializers
from .models import Borrowing_Saving

class Borrowing_SavingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Borrowing_Saving
        fields = '__all__'