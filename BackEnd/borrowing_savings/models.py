from django.db import models
from borrowings.models import Borrowing
from savings.models import Saving

# Create your models here.
class Borrowing_Saving(models.Model):
    # id = models.IntegerField(max_length=10)
    borrowing_id = models.ForeignKey('borrowings.Borrowing', on_delete=models.CASCADE)
    saving_id = models.ForeignKey('savings.Saving', on_delete=models.CASCADE)
    percent = models.FloatField(max_length=10)
