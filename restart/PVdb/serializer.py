from rest_framework import serializers
from .models import *

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['username', 'email']

class UserPlotsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['username', 'plotNumber', 'cropType', 'growthStage', 'growthStep', 'x', 'y', 'placed']

class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ['taskName', 'username', 'plotNumber', 'pomodorros']

class UserDatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDates
        fields = ['username', 'date', 'timeSpent']
# class DecorationsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Decorations
#         fields = ['name', 'price']

# class CropsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Crops
#         fields = ['name', 'price', 'worth']

class UserDecorationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDecorations
        fields = ['username', 'decoration', 'x', 'y', 'placed']

class UserFurnitureSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDecorations
        fields = ['username', 'furniture', 'x', 'y', 'placed']

class UsersCropsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCrop
        fields = ['username', 'tomato', 'sunflower', 'carrot', 'pumpkin', 'tulip']
