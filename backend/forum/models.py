from django.db import models

# Create your models here.

class Forum(models.Model):
    EventId = models.CharField(max_length = 200)
    UserName = models.CharField(max_length = 50)
    TimeStamp = models.DateTimeField(auto_now_add=True)
    PostId = models.IntegerField()
    Message = models.TextField(max_length = 500)