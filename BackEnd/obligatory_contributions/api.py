from obligatory_contributions.models import Obligatory_Contribution
from rest_framework import viewsets, permissions
from .serializers import Obligatory_ContributionSerializer

class Obligatory_ContributionViewSet(viewsets.ModelViewSet):
    queryset = Obligatory_Contribution.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = Obligatory_ContributionSerializer