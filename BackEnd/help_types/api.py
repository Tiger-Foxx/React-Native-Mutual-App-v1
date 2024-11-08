from help_types.models import Help_Type
from rest_framework import viewsets, permissions
from .serializers import HelpTypeSerializer

class HelpTypeViewSet(viewsets.ModelViewSet):
    queryset = Help_Type.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = HelpTypeSerializer