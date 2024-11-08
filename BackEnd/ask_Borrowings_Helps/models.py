from django.db import models
from members.models import Member
from users.models import User

# Create your models here.
class Ask_Borrowings_Helps(models.Model):
    title = models.TextField()
    body = models.TextField()
    type = models.CharField(max_length=8, default='emprunt')
    amount = models.IntegerField() 
    user_id = models.ForeignKey('users.User', on_delete=models.CASCADE)
    state = models.IntegerField(default=0)
    create_at = models.DateTimeField(auto_now_add=True)
    