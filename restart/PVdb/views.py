from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework.response import Response
from rest_framework import status
from django.db.models import F
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from datetime import timedelta
from django.http import JsonResponse

@csrf_exempt 

class PomodoroStatsView(APIView):
    def get(self, request, username):
        # Get today's date and the date 6 days ago to cover a week
        today = timezone.now().date()
        week_ago = today - timedelta(days=6)

        # Filter UserDates records for the given user and date range
        data = UserDates.objects.filter(
            username__username=username,
            date__range=[week_ago, today]
        ).annotate(
            date=TruncDay('date')
        ).values(
            'date'
        ).annotate(
            total_time_spent=Sum('timeSpent')  # Sum the time spent on each day
        ).order_by(
            'date'
        )

        # Convert QuerySet to a list of dictionaries
        response_data = [
            {'date': record['date'].strftime('%Y-%m-%d'), 'timeSpent': record['total_time_spent']}
            for record in data
        ]
        # pseudo data
        # data = [
        #     {'date': '2024-04-01', 'timeSpent': 120},
        #     {'date': '2024-04-02', 'timeSpent': 150},
        #     {'date': '2024-04-03', 'timeSpent': 90},
        #
        # ]
        # response_data = data
        return JsonResponse(response_data, safe=False)

class UsersView(APIView):
    def get(self, request):
        output = [{"username":output.username,
                  "email":output.email,
                  "money":output.money,
                  "houseStatus":output.houseStatus,
                  "housex":output.housex,
                  "housey":output.housey,
                  "plots":output.plots}
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
class MoneyView(APIView):
     def post(self, request):
        username = request.data.get('username', None)
        money = request.data.get('money', None)
        if username is None or money is None:
            return Response({"error": "Username or amount of money not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            Users.objects.filter(username=username).update(money=F('money') + money)
            return Response({"message": f"Money updated successfully for user {username}"}, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({"error": f"User with username {username} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class HouseView(APIView):
     def post(self, request):
        username = request.data.get('username', None)
        if username is None:
            return Response({"error": "Username not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            Users.objects.filter(username=username).update(houseStatus=F('houseStatus') + 1)
            return Response({"message": f"House Status updated successfully for user {username}"}, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({"error": f"User with username {username} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class PlotView(APIView):
     def post(self, request):
        username = request.data.get('username', None)
        if username is None:
            return Response({"error": "Username not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            Users.objects.filter(username=username).update(plots=F('plots') + 1)
            return Response({"message": f"Plots updated successfully for user {username}"}, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({"error": f"User with username {username} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class UserPlotsView(APIView):
    def get(self, request):
        username = request.data.get('username', None)
        userPlots = UserPlots.objects.filter(username=username)
        serializer = UserPlotsSerializer(userPlots, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserPlotsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class TasksView(APIView):
    def get(self, request):
        username = request.data.get('username', None)
        output = [{"taskName":output.taskName,
                   "username":output.username.username,
                  "taskCompleted":output.taskCompleted,
                  "plotNumber":output.plotNumber,
                  "pomodorros":output.pomodorros,
                  "pomodorrosCompleted":output.pomodorrosCompleted}
                  for output in Tasks.objects.filter(username=username)]
        return Response(output)
    def post (self, request):
        serializer = TasksSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    def delete(self, request):
        taskName = request.data.get('taskName', None)
        username = request.data.get('username', None)

        if taskName is None or username is None:
            return Response({"error": "Task name not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            task = Tasks.objects.get(taskName=taskName, username= username)
            task.delete()
            return Response({"message": f"Task with name {taskName} deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Users.DoesNotExist:
            return Response({"error": f"Task with name {taskName} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class TaskCompletedView(APIView):
     def post(self, request):
        username = request.data.get('username', None)
        taskName = request.data.get('taskName', None)
        if username is None or taskName is None:
            return Response({"error": "Username or amount of money not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            Tasks.objects.filter(username=username, taskName=taskName).update(taskCompleted=True)
            return Response({"message": f"Task completed successfully for user {username}"}, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({"error": f"User with username {username} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class IncreasePomodorroView(APIView):
     def post(self, request):
        username = request.data.get('username', None)
        taskName=request.data.get('taskName', None)
        if username is None or taskName is None:
            return Response({"error": "Username or amount of money not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            Tasks.objects.filter(username=username, taskName=taskName).update(pomodorrosCompleted=F('pomodorrosCompleted') + 1)
            return Response({"message": f"Task status updated successfully for user {username}"}, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({"error": f"User with username {username} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class UserDatesView(APIView):
    def get(self, request):
        userDates = UserDates.objects.all()
        serializer = UserDatesSerializer(userDates, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserDatesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# class DecorationsView(APIView):
#     def get(self, request):
#         output = [{"name":output.name,
#                   "price":output.price}
#                   for output in Decorations.objects.all()]
#         return Response(output)
#     def post (self, request):
#         serializer = DecorationsSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)
#     def delete(self, request):
#         name = request.data.get('name', None)
#         if name is None:
#             return Response({"error": "Decoration name not provided"}, status=status.HTTP_400_BAD_REQUEST)
#         try:
#             decoration = Decorations.objects.get(name=name)
#             decoration.delete()
#             return Response({"message": f"Decoration with name {name} deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
#         except Users.DoesNotExist:
#             return Response({"error": f"Decoration with name {name} does not exist"}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
# class CropsView(APIView):
#     def get(self, request):
#         output = [{"name":output.name,
#                   "price":output.price,
#                   "worth":output.worth}
#                   for output in Crops.objects.all()]
#         return Response(output)
#     def post (self, request):
#         serializer = CropsSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)
#     def delete(self, request):
#         name = request.data.get('name', None)
#         if name is None:
#             return Response({"error": "Crop not provided"}, status=status.HTTP_400_BAD_REQUEST)
#         try:
#             crop = Crops.objects.get(name=name)
#             crop.delete()
#             return Response({"message": f"Crop with name {name} deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
#         except Users.DoesNotExist:
#             return Response({"error": f"Crop with name {name} does not exist"}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class UserDecorationsView(APIView):
    def get(self, request):
        username = request.data.get('username', None)
        userDecorations = UserDecorations.objects.filter(username=username)
        serializer = UserDecorationsSerializer(userDecorations, many=True)
        return Response(serializer.data)

    def post(self, request):
        print(request.data)
        serializer = UserDecorationsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserCropsView(APIView):
    def get(self, request):
        username = request.data.get('username', None)
        userCrops = UserCrop.objects.filter(username=username)
        serializer = UsersCropsSerializer(userCrops, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UsersCropsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserFurnitureView(APIView):
    def get(self, request):
        username = request.data.get('username', None)
        userFurniture = UserFurniture.objects.filter(username=username)
        serializer = UserFurnitureSerializer(userFurniture, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserFurnitureSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserSettingsView(APIView):
    def get(self, request):
        username = request.data.get('username', None)
        userFurniture = UserSettings.objects.filter(username=username)
        serializer = UserSettingsSerializer(userFurniture, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSettingsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request):
        username = request.data.get('username', None)
        if username is None:
            return Response({"error": "Username not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = UserSettings.objects.get(username=username)
            user.delete()
            return Response({"message": f"User with username {username} deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Users.DoesNotExist:
            return Response({"error": f"User with username {username} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


