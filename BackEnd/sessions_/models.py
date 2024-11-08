from django.db import models
from exercises.models import Exercise
from administrators.models import Administrator
class Session(models.Model):
    # id = models.IntegerField(max_length=10)
    exercise_id = models.ForeignKey('exercises.Exercise', on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now=True)
    administrator_id = models.ForeignKey('administrators.Administrator', on_delete=models.CASCADE)
    state = models.CharField(max_length=255, default='SAVING')
    active = models.IntegerField(default=1)
    create_at = models.DateTimeField(auto_now=True)
