from django.db import models
from help_types.models import Help_Type
from administrators.models import Administrator
from members.models import Member
# Create your models here.
class Help(models.Model):
    # id = models.IntegerField(max_length=10)
    help_type_id = models.ForeignKey('help_types.Help_Type', on_delete=models.CASCADE)
    limit_date = models.CharField(max_length = 20)
    unit_amount = models.IntegerField()
    amount = models.IntegerField()
    comments = models.TextField(max_length=255)
    state = models.IntegerField(default=1)
    administrator_id = models.ForeignKey('administrators.Administrator', on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now_add=True)
    member_id = models.ForeignKey('members.Member', on_delete=models.CASCADE)