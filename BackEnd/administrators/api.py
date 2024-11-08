from administrators.models import Administrator
from rest_framework import viewsets, permissions
from .serializers import AdministratorSerializer

class AdministratorViewSet(viewsets.ModelViewSet):
    queryset = Administrator.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = AdministratorSerializer