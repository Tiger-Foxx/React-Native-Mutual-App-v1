from django.db import models
from members.models import Member
from administrators.models import Administrator
from  sessions_.models import Session
class Saving(models.Model):
    # id = models.IntegerField(max_length=10)
    member_id = models.ForeignKey('members.Member', on_delete=models.CASCADE)
    administrator_id = models.ForeignKey('administrators.Administrator', on_delete=models.CASCADE)
    amount = models.IntegerField()
    session_id = models.ForeignKey('sessions_.Session', on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now=True)
