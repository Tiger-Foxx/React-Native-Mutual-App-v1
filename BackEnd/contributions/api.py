from contributions.models import Contribution
from rest_framework import viewsets, permissions
from .serializers import ContributionSerializer

class ContributionViewSet(viewsets.ModelViewSet):
    queryset = Contribution.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ContributionSerializer