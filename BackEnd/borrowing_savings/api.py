from borrowing_savings.models import Borrowing_Saving
from rest_framework import viewsets, permissions
from .serializers import Borrowing_SavingSerializer

class Borrowing_SavingViewSet(viewsets.ModelViewSet):
    queryset = Borrowing_Saving.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = Borrowing_SavingSerializer