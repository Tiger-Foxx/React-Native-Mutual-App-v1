from django.db import models


# Create your models here.
class Help_Type(models.Model):
    # id = models.IntegerField(max_length=10)
    title = models.CharField(max_length=255)
    amount = models.IntegerField()
    active = models.IntegerField(default=1)