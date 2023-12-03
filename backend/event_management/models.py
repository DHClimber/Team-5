from django.db import models
from authentication.models import User
from event_management.choices import STATE_CHOICES

# Create your models here.

class Community(models.Model):
    admin = models.ForeignKey(User, on_delete=models.CASCADE)
    community_name = models.CharField(max_length=255)
    city = models.CharField(max_length=55)
    state = models.CharField(choices=STATE_CHOICES, max_length=2)

class Event(models.Model):
    event_name = models.CharField(max_length=255)
    # we should discuss what location should be, an address or what
    # if address then we need to expand to 
    # street_address, city, state, zipcode, building_number(if needed)
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=55)
    state = models.CharField(choices=STATE_CHOICES, max_length=2)
    zipcode = models.CharField(max_length=5)
    building_number = models.CharField(max_length=10, blank=True) # building number is optional
    start_date = models.DateField()
    end_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    community = models.ForeignKey(Community, on_delete=models.CASCADE)
