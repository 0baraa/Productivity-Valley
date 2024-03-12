from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework.response import Response
from rest_framework import status

class UsersView(APIView):
    def get(self, request):
        output = [{"firstName":output.firstName,
                  "lastName":output.lastName,
                  "username":output.username,
                  "email":output.email,
                  "plots":output.plots,
                  "money":output.money}
                  for output in Users.objects.all()]
        return Response(output)
    def post (self, request):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    def delete(self, request):
        username = request.data.get('username', None)
        if username is None:
            return Response({"error": "Username not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = Users.objects.get(username=username)
            user.delete()
            return Response({"message": f"User with username {username} deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Users.DoesNotExist:
            return Response({"error": f"User with username {username} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class TasksView(APIView):
    def get(self, request):
        output = [{"taskName":output.taskName,
                  "taskCompleted":output.taskCompleted,
                  "taskStatus":output.taskStatus,
                  "plotNumber":output.plotNumber,
                  "timeSpent":output.timeSpent,
                  "dateCompleted":output.dateCompleted,
                  "pomodorros":output.pomodorros}
                  for output in Tasks.objects.all()]
        return Response(output)
    def post (self, request):
        serializer = TasksSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    def delete(self, request):
        taskName = request.data.get('taskName', None)
        if taskName is None:
            return Response({"error": "Task name not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            task = Tasks.objects.get(taskName=taskName)
            task.delete()
            return Response({"message": f"Task with name {taskName} deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Users.DoesNotExist:
            return Response({"error": f"Task with name {taskName} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class DecorationsView(APIView):
    def get(self, request):
        output = [{"name":output.name,
                  "price":output.price}
                  for output in Decorations.objects.all()]
        return Response(output)
    def post (self, request):
        serializer = DecorationsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    def delete(self, request):
        name = request.data.get('name', None)
        if name is None:
            return Response({"error": "Decoration name not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            decoration = Decorations.objects.get(name=name)
            decoration.delete()
            return Response({"message": f"Decoration with name {name} deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Users.DoesNotExist:
            return Response({"error": f"Decoration with name {name} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class CropsView(APIView):
    def get(self, request):
        output = [{"name":output.name,
                  "price":output.price,
                  "worth":output.worth}
                  for output in Crops.objects.all()]
        return Response(output)
    def post (self, request):
        serializer = CropsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    def delete(self, request):
        name = request.data.get('name', None)
        if name is None:
            return Response({"error": "Crop not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            crop = Crops.objects.get(name=name)
            crop.delete()
            return Response({"message": f"Crop with name {name} deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Users.DoesNotExist:
            return Response({"error": f"Crop with name {name} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class UserDecorationsView(APIView):
    def get(self, request):
        userDecorations = UserDecorations.objects.all()
        serializer = UserDecorationsSerializer(userDecorations, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserDecorationsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserCropsView(APIView):
    def get(self, request):
        userCrops = UserCrop.objects.all()
        serializer = UsersCropsSerializer(userCrops, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UsersCropsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


