from borrowings.models import Borrowing
from rest_framework import viewsets, permissions
from .serializers import BorrowingSerializer

class BorrowingViewSet(viewsets.ModelViewSet):
    queryset = Borrowing.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = BorrowingSerializer