from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    username = models.CharField(max_length=255)
    trades = models.IntegerField(default=0)
    followers = models.IntegerField(default=0)
    following = models.IntegerField(default=0)

    def __str__(self):
        return self.username
    
class Item(models.Model):
    name = models.CharField(max_length=255)
    image = models.URLField()
    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.username