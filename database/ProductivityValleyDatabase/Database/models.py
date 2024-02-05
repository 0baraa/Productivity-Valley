from django.db import models

class Users(models.Model):
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    money = models.PositiveIntegerField(default=0)

class Tasks(models.Model):
    taskName = models.CharField(max_length=30)
    taskCompleted = models.BooleanField(default=False)
    taskStatus = models.IntegerField()
    pomodorros = models.PositiveIntegerField()
    

class Decorations(models.Model):
    name = models.CharField(max_length=30)
    price = models.PositiveIntegerField()
    image = models.ImageField(upload_to='images/', null=True, blank=True)

class Crops(models.Model):
    name = models.CharField(max_length=30)
    price = models.PositiveIntegerField()
    worth = models.PositiveIntegerField()
    image = models.ImageField(upload_to='images/', null=True, blank=True)

class UserDecorations(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    decoration = models.ForeignKey(Decorations, on_delete=models.CASCADE)
    class Meta:
        # Define composite primary key using unique_together
        unique_together = [['user', 'decoration']]

class UserCrop(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    crop = models.ForeignKey(Crops, on_delete=models.CASCADE)
    class Meta:
        # Define composite primary key using unique_together
        unique_together = [['user', 'crop']]