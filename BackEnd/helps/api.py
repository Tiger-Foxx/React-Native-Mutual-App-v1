from helps.models import Help
from rest_framework import viewsets, permissions
from .serializers import HelpSerializer

class HelpViewSet(viewsets.ModelViewSet):
    queryset = Help.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = HelpSerializer