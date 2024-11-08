from django.db import models
from borrowings.models import Borrowing
from members.models import Member
from administrators.models import Administrator
from exercises.models import Exercise
from sessions_.models import Session
# Create your models here.
class Refund(models.Model):
    # id = models.IntegerField(max_length=10)
    amount = models.IntegerField()
    # borrowing_id = models.ForeignKey('borrowings.Borrowing', on_delete=models.CASCADE)
    administrator_id = models.ForeignKey('administrators.Administrator', on_delete=models.CASCADE)
    member_id = models.ForeignKey('members.Member', on_delete=models.CASCADE, default=1)
    session_id = models.ForeignKey('sessions_.Session', on_delete=models.CASCADE)
    borrowing_id = models.ForeignKey('borrowings.Borrowing', on_delete=models.CASCADE,null=True)
    create_at = models.DateTimeField(auto_now_add=True)
