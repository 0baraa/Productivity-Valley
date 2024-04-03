from django.db import models
from django.contrib.auth.models import User


class Users(models.Model):    #table for users
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    username = models.CharField(max_length=50, unique=True, primary_key=True)
    email = models.EmailField(unique=True)
    money = models.PositiveIntegerField(default=0)
    houseStatus = models.PositiveIntegerField(default=0)
    plots = models.PositiveIntegerField(default=0)

class Tasks(models.Model):   #table for tasks
    taskName = models.CharField(max_length=30, primary_key=True)
    projectName = models.CharField(max_length=30, default = None)
    username = models.ForeignKey(Users, on_delete=models.CASCADE, to_field='username', default=False)
    taskCompleted = models.BooleanField(default=False)
    taskStatus = models.PositiveIntegerField(default=0)
    plotNumber = models.PositiveIntegerField(default=0)
    pomodorros = models.PositiveIntegerField(default=0)
    class Meta:
        # Define composite primary key using unique_together
        unique_together = [['taskName', 'username']]

class UserDates(models.Model):
    username = models.ForeignKey(Users, on_delete=models.CASCADE, to_field='username', default=False)
    date = models.DateField(default=False)
    timeSpent = models.PositiveIntegerField(default=0)  #total time spent on tasks on a given day
    class Meta:
        unique_together = [['username', 'date']]
class Decorations(models.Model):    #table for decorations
    name = models.CharField(max_length=30, unique = True, primary_key=True)
    price = models.PositiveIntegerField(default=0)

class Crops(models.Model):   #table for crops
    name = models.CharField(max_length=30, unique = True, primary_key=True)
    price = models.PositiveIntegerField(default=0)
    worth = models.PositiveIntegerField(default=0)

class UserDecorations(models.Model):    #table for users' decorations
    username = models.ForeignKey(Users, on_delete=models.CASCADE, to_field='username')
    decoration = models.ForeignKey(Decorations, on_delete=models.CASCADE, to_field='name')
    coordinates  = models.CharField(max_length=12, default=None)
    class Meta:
        # Define composite primary key using unique_together
        unique_together = [['username', 'decoration']]

class UserCrop(models.Model):    #table for users' crops
    username = models.ForeignKey(Users, on_delete=models.CASCADE, to_field='username')
    crop = models.ForeignKey(Crops, on_delete=models.CASCADE, to_field='name')
    class Meta:
        # Define composite primary key using unique_together
        unique_together = [['username', 'crop']]