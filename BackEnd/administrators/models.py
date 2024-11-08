from django.db import models
from users.models import User

# Create your models here.
class Administrator(models.Model):
    # id = models.IntegerField(max_length=10)
    root = models.IntegerField(default=0)
    username = models.CharField(max_length=8,  blank=True)

    user_id = models.ForeignKey('users.User', on_delete=models.CASCADE)