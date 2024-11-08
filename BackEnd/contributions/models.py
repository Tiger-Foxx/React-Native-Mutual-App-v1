from django.db import models
from members.models import Member
from helps.models import Help
from administrators.models import Administrator
# Create your models here.
class Contribution(models.Model):
    member_id = models.ForeignKey('members.Member', on_delete=models.CASCADE)
    date = models.CharField(max_length=20)
    state = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    help_id = models.ForeignKey('helps.Help', on_delete=models.CASCADE)
    administrator_id = models.ForeignKey('administrators.Administrator', on_delete=models.CASCADE)