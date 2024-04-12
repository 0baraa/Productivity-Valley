from rest_framework import serializers
from .models import *

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['usernameID', 'email']

class UserPlotsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPlots
        fields = ['usernameId', 'plotId', 'crop', 'growthStage', 'growthStep', 'x', 'y', 'placed']

class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ['taskName', 'usernameId', 'completed', 'plotId', 'pomodoros', 'pomodorosCompleted', 'elapsedTime', 'subTask1', 'subTaskCompleted1', 'subTask2', 'subTaskCompleted2', 'subTask3', 'subTaskCompleted3', 'subTask4', 'subTaskCompleted4', 'subTask5', 'subTaskCompleted5', 'subTask6', 'subTaskCompleted6', 'subTask7', 'subTaskCompleted7', 'subTask8', 'subTaskCompleted8', 'subTask9', 'subTaskCompleted9', 'subTask10', 'subTaskCompleted10', ]

class UserDatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDates
        fields = ['usernameId', 'date', 'timeSpent']
        
# class DecorationsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Decorations
#         fields = ['name', 'price']

class CropsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crops
        fields = ['name', 'price', 'worth']

class UserDecorationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDecorations
        fields = ['usernameId', 'type', 'x', 'y', 'placed']

class UserFurnitureSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFurniture
        fields = ['usernameId', 'type', 'x', 'y', 'placed']

class UsersCropsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCrop
        fields = ['usernameId', 'tomato', 'sunflower', 'carrot', 'pumpkin', 'tulip']
class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = ['usernameId', 'pomTimer', 'shortBreak', 'longBreak', 'longBreakInterval', 'autoStartPom', 'autoStartBreak', 'autoHideTime', 'fontStyle', 'fontSize']
