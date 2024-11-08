from requests import Response
from members.models import Member
from rest_framework import viewsets, permissions
from sessions_.models import Session
from .serializers import MemberSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from obligatory_contributions.models import Obligatory_Contribution
from sessions_.models import Session
from .models import Member
from .serializers import MemberSerializer


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = MemberSerializer


class UnpaidObligatoryContributionMembersViewSet(viewsets.ViewSet):
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        """
        Retourne la liste des membres qui n'ont pas encore payé leur contribution obligatoire pour toutes les sessions.
        """
        # Obtenir les membres qui n'ont pas encore payé leur contribution pour toutes les sessions
        unpaid_members = Member.objects.filter(
            obligatory_contribution__contributed=0
        ).distinct()

        # Sérialiser les membres
        serializer = MemberSerializer(unpaid_members, many=True)
        return Response(serializer.data)