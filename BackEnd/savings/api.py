from savings.models import Saving
from rest_framework import viewsets, permissions
from .serializers import SavingSerializer

class SavingViewSet(viewsets.ModelViewSet):
    queryset = Saving.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = SavingSerializer