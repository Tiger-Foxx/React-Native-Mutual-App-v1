from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from sessions_.models import Session
from obligatory_contributions.models import Obligatory_Contribution
from helps.models import Help
from savings.models import Saving
from members.models import Member  # Importer Member ici
from configs.models import Config

from .serializers import FondSocialSerializer, TresorerieSerializer

class FondSocialViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        #exercice_id = request.query_params.get('exercice_id')
        all_members = Member.objects.all()
        enrolled_members = Member.objects.filter(inscription=1)
        all_configs = Config.objects.all()
        last_config = Config.objects.all()[len(all_configs) - 1]
        inscription_per_member = last_config.inscription_per_member
        contribution_montly = last_config.monthly_contribution_per_member
        fond_social = (len(all_members)*contribution_montly)+(len(enrolled_members)*inscription_per_member)
        # if not exercice_id:
        #     return Response({'error': 'exercice_id is required'}, status=400)
        try:
            return Response({'fond_social':fond_social})
        except Exception as e:
            return Response({'error': f'Erreur lors du calcul du fonds social : {e}'}, status=500)

class TresorerieViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        #exercice_id = request.query_params.get('exercice_id')
        # if not exercice_id:
        #     return Response({'error': 'exercice_id is required'}, status=400)

        try:
            tresorerie = 0
            for session in Session.objects.all():
                for saving in Saving.objects.filter(session_id=session):
                    tresorerie += saving.amount

            serializer = TresorerieSerializer(data={'tresorerie': tresorerie})
            serializer.is_valid()
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': f'Erreur lors du calcul de la trésorerie : {e}'}, status=500)


class ActiveSessionViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self,request):

        try:
            ActiveSession = Session.objects.filter(active=1)
            if len(ActiveSession) > 0:
                print(len(ActiveSession))
                return Response({'session_state':"active"})
            else:
                return Response({'session_state':"off"})
        except Exception as e:
            return Response({'error': f'Erreur lors du calcul de la trésorerie : {e}'})
        

class CloseSessionViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        try:
            # Récupérer la session active
            active_session = Session.objects.filter(active=1).first()

            if active_session:
                active_session.active = 0
                active_session.save()
                return Response({'session_state': "off"})
            else:
                return Response({'error': 'Aucune session active trouvée.'}, status=404)

        except Exception as e:
            return Response({'error': f'Erreur lors de la fermeture de la session : {e}'}, status=500)