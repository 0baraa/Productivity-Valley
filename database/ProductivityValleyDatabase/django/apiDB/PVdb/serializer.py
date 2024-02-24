from rest_framework import serializers
from .models import *

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['firstName', 'lastName', 'username', 'email', 'money']

class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ['taskName', 'taskCompleted', 'taskStatus', 'plotNumber', 'pomodorros']

class DecorationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Decorations
        fields = ['name', 'price', 'bought']

class CropsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crops
        fields = ['name', 'price', 'worth', 'bought']

class UserDecorationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDecorations
        fields = ['user', 'decoration', 'coordinates']

class UsersCrops(serializers.ModelSerializer):
    class Meta:
        model = UserCrop
        fields = ['user', 'crop']
