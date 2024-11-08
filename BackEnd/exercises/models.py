from django.db import models
from administrators.models import Administrator
# Create your models here.
class Exercise(models.Model):
    year = models.IntegerField()
    active = models.IntegerField(default=1)
    administrator_id = models.ForeignKey('administrators.Administrator', on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now=True)