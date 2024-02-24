from django.db import models

class Users(models.Model):    #table for users
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    money = models.PositiveIntegerField(default=0)

class Tasks(models.Model):   #table for tasks
    taskName = models.CharField(max_length=30)
    taskCompleted = models.BooleanField(default=False)
    taskStatus = models.PositiveIntegerField(default=0)
    plotNumber = models.PositiveIntegerField(default=0)
    pomodorros = models.PositiveIntegerField(default=0)
    

class Decorations(models.Model):    #table for decorations
    name = models.CharField(max_length=30)
    price = models.PositiveIntegerField(default=0)
    bought = models.BooleanField(default=False)

class Crops(models.Model):   #table for crops
    name = models.CharField(max_length=30)
    price = models.PositiveIntegerField(default=0)
    worth = models.PositiveIntegerField(default=0)
    bought = models.BooleanField(default=False)

class UserDecorations(models.Model):    #table for users' decorations
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    decoration = models.ForeignKey(Decorations, on_delete=models.CASCADE)
    coordinates  = models.CharField(max_length=12, default=None)
    class Meta:
        # Define composite primary key using unique_together
        unique_together = [['user', 'decoration']]

class UserCrop(models.Model):    #table for users' crops
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    crop = models.ForeignKey(Crops, on_delete=models.CASCADE)
    class Meta:
        # Define composite primary key using unique_together
        unique_together = [['user', 'crop']]