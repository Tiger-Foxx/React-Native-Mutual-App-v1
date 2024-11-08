from configs.models import Config
from rest_framework import viewsets, permissions
from .serializers import ConfigSerializer

class ConfigViewSet(viewsets.ModelViewSet):
    queryset = Config.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ConfigSerializer