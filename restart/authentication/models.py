from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    is_email_verified = models.BooleanField(default=False)
    money = models.PositiveIntegerField(default=0)
    houseStatus = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.email