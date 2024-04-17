from django.db import models
#from django.contrib.auth.models import User

from django.core.validators import MaxValueValidator

class UserFarm(models.Model):    #table for users
    usernameId = models.CharField(max_length=150, unique=True, primary_key=True)
    coins = models.PositiveIntegerField(default=0, blank=True)
    farmHouseLevel = models.PositiveIntegerField(default=1, blank=True, validators=[MaxValueValidator(10)])
    x = models.PositiveIntegerField(default=70, blank=True, validators=[MaxValueValidator(2000)])
    y = models.PositiveIntegerField(default=570, blank=True, validators=[MaxValueValidator(2000)])

    ##Please Remove
    email = models.EmailField(default="blank")

class UserPlots(models.Model):
    #id = models.PositiveIntegerField(default = 0, null = True)
    id = models.AutoField(primary_key=True)
    usernameId = models.CharField(max_length=150, default="guest")
    plotId = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(7)])
    crop = models.CharField(default="nothing", max_length=12)
    growthStage = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(10)])
    growthStep = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(36)])
    x = models.PositiveIntegerField(default=2000, validators=[MaxValueValidator(2000)])
    y = models.PositiveIntegerField(default=2000, validators=[MaxValueValidator(2000)])
    placed = models.BooleanField(default=False)
    class Meta:
        # Define composite primary key using unique_together
        unique_together = [['plotId', 'usernameId']]

class Tasks(models.Model):   #table for tasks
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    usernameId = models.CharField(max_length=150, default="false")
    completed = models.BooleanField(default=False)
    plotId = models.PositiveIntegerField(default=0)
    pomodoros = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(20)])
    pomodorosCompleted = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(20)])
    timerState = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(2)])
    timerTime = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(7200)])
    elapsedTime = models.FloatField(default=0, validators=[MaxValueValidator(40)])
    subTask1 = models.CharField(default = None, max_length=32, null=True)
    subTaskCompleted1 = models.BooleanField(default=None, null=True)
    subTask1 = models.CharField(default = None, max_length=32, null=True)
    subTaskCompleted1 = models.BooleanField(default=None, null=True)
    subTask2 = models.CharField(default = None, max_length=32, null=True)
    subTaskCompleted2 = models.BooleanField(default=None, null=True)
    subTask3 = models.CharField(default = None, max_length=32, null=True)
    subTaskCompleted3 = models.BooleanField(default=None, null=True)
    subTask4 = models.CharField(default = None, max_length=32, null=True)
    subTaskCompleted4 = models.BooleanField(default=None, null=True)
    subTask5 = models.CharField(default = None, max_length=32, null=True)
    subTaskCompleted5 = models.BooleanField(default=None, null=True)
    subTask6 = models.CharField(default = None, max_length=32, null=True)
    subTaskCompleted6 = models.BooleanField(default=None, null=True)
    subTask7 = models.CharField(default = None, max_length=32, null=True)
    subTaskCompleted7 = models.BooleanField(default=None, null=True)
    subTask8 = models.CharField(default = None, max_length=32, null=True)
    subTaskCompleted8 = models.BooleanField(default=None, null=True)
    subTask9 = models.CharField(default = None, max_length=32, null=True)
    subTaskCompleted9 = models.BooleanField(default=None, null=True)
    subTask10 = models.CharField(default = None, max_length=32, null=True)
    subTaskCompleted10 = models.BooleanField(default=None, null=True)
    class Meta:
        # Define composite primary key using unique_together
        unique_together = [['plotId', 'usernameId']]

class UserDates(models.Model):
    usernameId = models.CharField(max_length=150, default=False)
    date = models.DateField(default=False)
    timeSpent = models.PositiveIntegerField(default=0)  #total time spent on tasks on a given day
    class Meta:
        unique_together = [['usernameId', 'date']]
class Decorations(models.Model):    #table for decorations
    name = models.CharField(max_length=30, unique = True, primary_key=True)
    price = models.PositiveIntegerField(default=0)

class Crops(models.Model):   #table for crops
    name = models.CharField(max_length=30, unique = True, primary_key=True)
    price = models.PositiveIntegerField(default=0)
    worth = models.PositiveIntegerField(default=0)

class UserDecorations(models.Model):    #table for users' decorations
    id = models.AutoField(primary_key=True)
    usernameId = models.CharField(max_length=150, default=False)
    type = models.CharField(max_length=30)
    x = models.PositiveIntegerField(default=2000, validators=[MaxValueValidator(2000)])
    y = models.PositiveIntegerField(default=2000, validators=[MaxValueValidator(2000)])
    placed = models.BooleanField(default=False)
    class Meta:
        # Define composite primary key using unique_together
        unique_together = [['usernameId', 'type']]

class UserFurniture(models.Model):    #table for users' decorations
    id = models.AutoField(primary_key=True)
    usernameId = models.CharField(max_length=150, default=False)
    type = models.CharField(max_length=30)
    x = models.PositiveIntegerField(default=2000, validators=[MaxValueValidator(2000)])
    y = models.PositiveIntegerField(default=2000, validators=[MaxValueValidator(2000)])
    placed = models.BooleanField(default=False)
    class Meta:
        # Define composite primary key using unique_together
        unique_together = [['usernameId', 'type']]

class UserSeeds(models.Model):    #table for users' crops
    usernameId = models.OneToOneField(UserFarm, on_delete=models.CASCADE, to_field='usernameId', primary_key=True)
    tomato = models.IntegerField(default=-1, validators=[MaxValueValidator(100)])
    sunflower = models.IntegerField(default=-1, validators=[MaxValueValidator(100)])
    carrot = models.IntegerField(default=-1, validators=[MaxValueValidator(100)])
    pumpkin = models.IntegerField(default=-1, validators=[MaxValueValidator(100)])
    tulip = models.IntegerField(default=-1, validators=[MaxValueValidator(100)])

class UserSettings(models.Model):    #table for users' crops
    usernameId = models.OneToOneField(UserFarm, on_delete=models.CASCADE, to_field='usernameId', primary_key=True)
    pomTimer = models.IntegerField(default=25, validators=[MaxValueValidator(120)])
    shortBreak = models.IntegerField(default=5, validators=[MaxValueValidator(120)])
    longBreak = models.IntegerField(default=20, validators=[MaxValueValidator(120)])
    longBreakInterval = models.IntegerField(default=5, validators=[MaxValueValidator(20)])
    autoStartPom = models.BooleanField(default=False)
    autoStartBreak = models.BooleanField(default=False)
    fontStyle = models.CharField(max_length=15, default="pixel")
    fontSize = models.IntegerField(default=5, validators=[MaxValueValidator(15)])