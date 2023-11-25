from django.db import models
from authentication.models import User

# Create your models here.
class Community(models.Model):
    STATE_CHOICES = [
        ('FL', 'Florida'),
        ]
    admin = models.ForeignKey(User, on_delete=models.CASCADE)
    community_name = models.CharField(max_length=255)
    city = models.CharField(max_length=55)
    state = models.CharField(choices=STATE_CHOICES, max_length=2)

