from exercises.models import Exercise
from rest_framework import viewsets, permissions
from .serializers import ExerciseSerializer

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ExerciseSerializer