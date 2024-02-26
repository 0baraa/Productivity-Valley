from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework.response import Response

class UsersView(APIView):
    def get(self, request):
        output = [{"firstName":output.firstName,
                  "lastName":output.lastName,
                  "username":output.username,
                  "email":output.email,
                  "money":output.money}
                  for output in Users.objects.all()]
        return Response(output)
    def post (self, request):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
class TasksView(APIView):
    def get(self, request):
        output = [{"taskName":output.taskName,
                  "taskCompleted":output.taskCompleted,
                  "taskStatus":output.taskStatus,
                  "plotNumber":output.plotNumber,
                  "pomodorros":output.pomodorros}
                  for output in Tasks.objects.all()]
        return Response(output)
    def post (self, request):
        serializer = TasksSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
class DecorationsView(APIView):
    def get(self, request):
        output = [{"name":output.name,
                  "price":output.price,
                  "bought":output.bought}
                  for output in Decorations.objects.all()]
        return Response(output)
    def post (self, request):
        serializer = DecorationsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
class CropsView(APIView):
    def get(self, request):
        output = [{"name":output.name,
                  "price":output.price,
                  "worth":output.worth,
                  "bought":output.bought}
                  for output in Crops.objects.all()]
        return Response(output)
    def post (self, request):
        serializer = CropsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


# Create your views here.
