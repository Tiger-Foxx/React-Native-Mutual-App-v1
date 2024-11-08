from django.db import models
from users.models import User
from administrators.models import Administrator
# Create your models here.
class Member(models.Model):
    # id = models.IntegerField(max_length=10)
    user_id = models.ForeignKey('users.User', on_delete=models.CASCADE)
    username = models.CharField(max_length=8,  blank=True)

    active = models.IntegerField(default=1)
    social_crown = models.IntegerField(default=0)
    inscription = models.IntegerField(default=10000)
    administrator_id = models.ForeignKey('administrators.Administrator', on_delete=models.CASCADE)