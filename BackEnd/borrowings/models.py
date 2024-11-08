from django.db import models
from members.models import Member
from sessions_.models import Session
# Create your models here.
class Borrowing(models.Model):
    # id = models.IntegerField(max_length=10)
    interest = models.IntegerField()
    amount_borrowed = models.IntegerField(blank=True, null=True)
    amount_paid= models.IntegerField(default=0)
    amount_to_pay= models.IntegerField(blank=True, null=True)
    payment_date_line = models.DateTimeField(blank=True,null=True)
    member_id = models.ForeignKey('members.Member', on_delete=models.CASCADE)
    administrator_id = models.ForeignKey('administrators.Administrator', on_delete=models.CASCADE)
    session_id = models.ForeignKey('sessions_.Session', on_delete=models.CASCADE)
    state = models.IntegerField(default=0)
    create_at = models.DateTimeField(auto_now_add=True)
