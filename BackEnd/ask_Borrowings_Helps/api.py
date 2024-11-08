from ask_Borrowings_Helps.models import Ask_Borrowings_Helps
from rest_framework import viewsets, permissions
from .serializers import Ask_Borrowings_HelpsSerializer

class Ask_Borrowings_HelpsViewSet(viewsets.ModelViewSet):
    queryset = Ask_Borrowings_Helps.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = Ask_Borrowings_HelpsSerializer