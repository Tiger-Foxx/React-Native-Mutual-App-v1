from refunds.models import Refund
from rest_framework import viewsets, permissions
from .serializers import RefundSerializer

class RefundViewSet(viewsets.ModelViewSet):
    queryset = Refund.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RefundSerializer