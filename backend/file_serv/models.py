from django.db import models
from event_management.models import Event

# Create your models here.
class FileSave(models.Model):
    file_path = models.CharField(max_length=1000)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
