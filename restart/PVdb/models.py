from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class Users(models.Model):    #table for users
    username = models.CharField(max_length=50, unique=True, primary_key=True)
    email = models.EmailField(unique=True)
    money = models.PositiveIntegerField(default=0)
    houseStatus = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(10)])
    housex = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(640)])
    housey = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(1200)])
    plots = models.PositiveIntegerField(default=0)

class UserPlots(models.Model):
    username = models.ForeignKey(Users, on_delete=models.CASCADE, to_field='username', default=False)
    plotNumber = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(7)], primary_key=True)
    cropType = models.CharField(default=None, max_length=12)
    growthStage = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(10)])
    growthStep = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(36)])
    x = models.PositiveIntegerField(default=None, validators=[MaxValueValidator(640)])
    y = models.PositiveIntegerField(default=None, validators=[MaxValueValidator(1200)])
    placed = models.BooleanField(default=False)

class Tasks(models.Model):   #table for tasks
    taskName = models.CharField(max_length=30, primary_key=True)
    username = models.ForeignKey(Users, on_delete=models.CASCADE, to_field='username', default=False)
    taskCompleted = models.BooleanField(default=False)
    plotNumber = models.PositiveIntegerField(default=0)
    pomodorros = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(20)])
    pomodorrosCompleted = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(20)])
    subTask1 = models.CharField(default = None, max_length=32)
    subTaskCompleted1 = models.BooleanField(default=None)
    subTask1 = models.CharField(default = None, max_length=32)
    subTaskCompleted1 = models.BooleanField(default=None)
    subTask2 = models.CharField(default = None, max_length=32)
    subTaskCompleted2 = models.BooleanField(default=None)
    subTask3 = models.CharField(default = None, max_length=32)
    subTaskCompleted3 = models.BooleanField(default=None)
    subTask4 = models.CharField(default = None, max_length=32)
    subTaskCompleted4 = models.BooleanField(default=None)
    subTask5 = models.CharField(default = None, max_length=32)
    subTaskCompleted5 = models.BooleanField(default=None)
    subTask6 = models.CharField(default = None, max_length=32)
    subTaskCompleted6 = models.BooleanField(default=None)
    subTask7 = models.CharField(default = None, max_length=32)
    subTaskCompleted7 = models.BooleanField(default=None)
    subTask8 = models.CharField(default = None, max_length=32)
    subTaskCompleted8 = models.BooleanField(default=None)
    subTask9 = models.CharField(default = None, max_length=32)
    subTaskCompleted9 = models.BooleanField(default=None)
    subTask10 = models.CharField(default = None, max_length=32)
    subTaskCompleted10 = models.BooleanField(default=None)
    class Meta:
        # Define composite primary key using unique_together
        unique_together = [['taskName', 'username']]

class UserDates(models.Model):
    username = models.ForeignKey(Users, on_delete=models.CASCADE, to_field='username', default=False)
    date = models.DateField(default=False)
    timeSpent = models.PositiveIntegerField(default=0)  #total time spent on tasks on a given day
    class Meta:
        unique_together = [['username', 'date']]
# class Decorations(models.Model):    #table for decorations
#     name = models.CharField(max_length=30, unique = True, primary_key=True)
#     price = models.PositiveIntegerField(default=0)

# class Crops(models.Model):   #table for crops
#     name = models.CharField(max_length=30, unique = True, primary_key=True)
#     price = models.PositiveIntegerField(default=0)
#     worth = models.PositiveIntegerField(default=0)

class UserDecorations(models.Model):    #table for users' decorations
    username = models.ForeignKey(Users, on_delete=models.CASCADE, to_field='username')
    decoration = models.CharField(max_length=30, primary_key=True)
    x = models.PositiveIntegerField(default=None, validators=[MaxValueValidator(640)])
    y = models.PositiveIntegerField(default=None, validators=[MaxValueValidator(1200)])
    placed = models.BooleanField(default=False)
    class Meta:
        # Define composite primary key using unique_together
        unique_together = [['username', 'decoration']]

class UserFurniture(models.Model):    #table for users' decorations
    username = models.ForeignKey(Users, on_delete=models.CASCADE, to_field='username')
    furniture = models.CharField(max_length=30, primary_key=True)
    x = models.PositiveIntegerField(default=None, validators=[MaxValueValidator(640)])
    y = models.PositiveIntegerField(default=None, validators=[MaxValueValidator(1200)])
    placed = models.BooleanField(default=False)
    class Meta:
        # Define composite primary key using unique_together
        unique_together = [['username', 'furniture']]

class UserCrop(models.Model):    #table for users' crops
    username = models.ForeignKey(Users, on_delete=models.CASCADE, to_field='username', primary_key=True)
    tomato = models.IntegerField(default=-1, validators=[MaxValueValidator(100)])
    sunflower = models.IntegerField(default=-1, validators=[MaxValueValidator(100)])
    carrot = models.IntegerField(default=-1, validators=[MaxValueValidator(100)])
    pumpkin = models.IntegerField(default=-1, validators=[MaxValueValidator(100)])
    tulip = models.IntegerField(default=-1, validators=[MaxValueValidator(100)])

class UserSettings(models.Model):    #table for users' crops
    username = models.ForeignKey(Users, on_delete=models.CASCADE, to_field='username', primary_key=True)
    pomTimer = models.IntegerField(default=25, validators=[MaxValueValidator(120)])
    shortBreak = models.IntegerField(default=5, validators=[MaxValueValidator(120)])
    longBreak = models.IntegerField(default=20, validators=[MaxValueValidator(120)])
    longBreakInterval = models.IntegerField(default=5, validators=[MaxValueValidator(20)])
    autoStartPom = models.BooleanField(default=False)
    autoStartBreak = models.BooleanField(default=False)
    autoHideTime = models.BooleanField(default=False)
    fontStyle = models.CharField(max_length=15)
    fontSize = models.IntegerField(default=5, validators=[MaxValueValidator(15)])