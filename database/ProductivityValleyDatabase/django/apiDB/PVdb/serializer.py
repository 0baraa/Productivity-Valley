from rest_framework import serializers
from .models import *

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['firstName', 'lastName', 'username', 'email', 'plots', 'money']

class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ['taskName', 'taskCompleted', 'taskStatus', 'plotNumber', 'timeSpent', 'dateCompleted' 'pomodorros']

class DecorationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Decorations
        fields = ['name', 'price']

class CropsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crops
        fields = ['name', 'price', 'worth']

class UserDecorationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDecorations
        fields = ['username', 'decoration', 'coordinates']

class UsersCropsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCrop
        fields = ['username', 'crop']
