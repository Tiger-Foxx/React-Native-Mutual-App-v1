from django.db import models
# Create your models here.
class Config(models.Model):
    # id = models.IntegerField(max_length=10)
    # user_id = models.ForeignKey('User', on_delete=models.CASCADE)
    interest_per_borrow = models.IntegerField(default=10)
    inscription_per_member = models.IntegerField(default=10000)
    no_months_to_pay_0_to_300K = models.IntegerField(default=3)
    no_months_to_pay_300_to_600K = models.IntegerField(default=6)
    # social_funds_per_member = models.IntegerField(default=20000)
    monthly_contribution_per_member = models.IntegerField(default=20000)
