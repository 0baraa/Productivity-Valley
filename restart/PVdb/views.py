from django.db.models.functions import TruncDay
from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework.response import Response
from rest_framework import status
from django.db.models import F, Sum
from django.utils import timezone
from datetime import timedelta
from django.http import JsonResponse
from django.shortcuts import get_object_or_404


class PomodoroStatsView(APIView):
    def get(self, request, username):
        # Get today's date and the date 6 days ago to cover a week
        today = timezone.now().date()
        week_ago = today - timedelta(days=6)

        # Filter UserDates records for the given user and date range
        data = UserDates.objects.filter(
            username__usernameId=username,
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
        output = [{"usernameId":output.usernameId,
                  "email":output.email,
                  "coins":output.coins,
                  "farmHouseLevel":output.farmHouseLevel,
                  "x":output.x,
                  "y":output.y,
                  "plots":output.plots}
                  for output in Users.objects.all()]
        return Response(output)


    def post (self, request):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    def delete(self, request):
        usernameId = request.data.get('usernameId', None)
        if usernameId is None:
            return Response({"error": "Username not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = Users.objects.get(usernameId=usernameId)
            user.delete()
            return Response({"message": f"User with username {usernameId} deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Users.DoesNotExist:
            return Response({"error": f"User with username {usernameId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class MoneyView(APIView):
     def post(self, request):
        usernameId = request.data.get('usernameId', None)
        coins = request.data.get('coins', None)
        if usernameId is None or money is None:
            return Response({"error": "Username or amount of money not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = Users.objects.get(usernameId=usernameId)
            user.coins = coins
            user.save()
            return Response({"message": f"Money updated successfully for user {usernameId}"}, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({"error": f"User with username {usernameId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class HouseView(APIView):
     def post(self, request):
        usernameId = request.data.get('usernameId', None)
        farmHouseLevel = request.data.get('farmHouseLevel', None)
        if usernameId is None:
            return Response({"error": "Username not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = Users.objects.get(usernameId=usernameId)
            user.farmHouseLevel = farmHouseLevel
            user.save()
            return Response({"message": f"Money updated successfully for user {usernameId}"}, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({"error": f"User with usernameId {usernameId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class PlotView(APIView):
     def post(self, request):
        usernameId = request.data.get('usernameId', None)
        plots = request.data.get('plots', None)
        if usernameId is None:
            return Response({"error": "usernameId not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = Users.objects.get(usernameId=usernameId)
            user.plots = plots
            user.save()
            return Response({"message": f"Plots updated successfully for user {usernameId}"}, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({"error": f"User with usernameId {usernameId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class UserPlotsView(APIView):
    def get(self, request):
        usernameId = request.data.get('usernameId', None)
        userPlots = UserPlots.objects.filter(usernameId=usernameId)
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
        userCrops = Tasks.objects.all()
        serializer = TasksSerializer(userCrops, many=True)
        return Response(serializer.data)
    def post (self, request):
        serializer = TasksSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    def delete(self, request):
        plotId = request.data.get('plotId', None)
        usernameId = request.data.get('usernameId', None)

        if plotId is None or usernameId is None:
            return Response({"error": "Task name not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            task = Tasks.objects.get(plotId=plotId, usernameId=usernameId)
            task.delete()
            return Response({"message": f"Task with name {plotId} deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Tasks.DoesNotExist:
            return Response({"error": f"Task with name {plotId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class TaskCompletedView(APIView):
     def post(self, request):
        usernameId = request.data.get('usernameId', None)
        plotId = request.data.get('plotId', None)
        if usernameId is None or plotId is None:
            return Response({"error": "usernameId or amount of money not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            Tasks.objects.filter(usernameId=usernameId, plotId=plotId).update(completed=True)
            return Response({"message": f"Task completed successfully for user {usernameId}"}, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({"error": f"User with usernameId {usernameId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class IncreasePomodorroView(APIView):
     def post(self, request):
        usernameId = request.data.get('usernameId', None)
        plotId=request.data.get('plotId', None)
        if usernameId is None or plotId is None:
            return Response({"error": "usernameId or amount of money not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            Tasks.objects.filter(usernameId=usernameId, plotId=plotId).update(pomodorrosCompleted=F('pomodorrosCompleted') + 1)
            return Response({"message": f"Task status updated successfully for user {usernameId}"}, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({"error": f"User with usernameId {usernameId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class UserDatesView(APIView):
    def get(self, request):
        userDates = UserDates.objects.all()
        serializer = UserDatesSerializer(userDates, many=True)
        return Response(serializer.data)

    def post(self, request):
        # 尝试获取现有记录
        user_date = UserDates.objects.filter(usernameId=request.data.get('usernameId'), date=request.data.get('date')).first()
        if user_date:
            # 如果存在，更新记录
            user_date.timeSpent += int(request.data.get('timeSpent', 0))
            user_date.save()
            return Response(status=status.HTTP_204_NO_CONTENT)  # 或其他适当的响应
        else:
            # 如果不存在，创建新记录
            serializer = UserDatesSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # def post(self, request):
    #     serializer = UserDatesSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class DecorationsView(APIView):

    def post(self, request):
        serializer = DecorationsSerializer(data=request.data)
        if not serializer.is_valid():  # 检查序列化器是否有效
            print(serializer.errors)  # 打印错误信息
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # 返回错误信息和400状态码

        # 如果数据有效，保存装饰项并返回成功响应
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    def get(self, request):
        output = [{"name":output.name,
                  "price":output.price}
                  for output in Decorations.objects.all()]
        return Response(output)
    # def post (self, request):
    #     serializer = DecorationsSerializer(data=request.data)
    #     if serializer.is_valid(raise_exception=True):
    #         serializer.save()
    #         return Response(serializer.data)
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
        print(serializer)
        return Response(serializer.data)
    def post(self, request):
        print(request.data)
        serializer = UserDecorationsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    def delete(self, request):
            type = request.data.get('type', None)
            usernameId = request.data.get('usernameId', None)

            if type is None or usernameId is None:
                return Response({"error": "Task name not provided"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                plot = UserDecorations.objects.get(type=type, usernameId=usernameId)
                plot.delete()
                return Response({"message": f"Task with name {type} deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
            except UserDecorations.DoesNotExist:
                return Response({"error": f"Task with name {type} does not exist"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class UserPlotsView(APIView):
    def get(self, request):
        userDecorations = UserPlots.objects.all()
        serializer = UserPlotsSerializer(userDecorations, many=True)
        print(serializer)
        return Response(serializer.data)
    def post(self, request):
        print(request.data)
        serializer = UserPlotsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    def delete(self, request):
            plotId = request.data.get('plotId', None)
            usernameId = request.data.get('usernameId', None)

            if plotId is None or usernameId is None:
                return Response({"error": "Task name not provided"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                plot = UserDecorations.objects.get(plotId=plotId, usernameId=usernameId)
                plot.delete()
                return Response({"message": f"Task with name {plotId} deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
            except UserDecorations.DoesNotExist:
                return Response({"error": f"Task with name {plotId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class UserCropsView(APIView):
    def get(self, request):
        userCrops = UserCrop.objects.all()
        serializer = UsersCropsSerializer(userCrops, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        user = request.data.get('usernameId')
        try:
            userInstance = Users.objects.get(usernameId=user)
        except Users.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = UsersCropsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['usernameId'] = userInstance
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request):
        usernameId = request.data.get('usernameId', None)
        if usernameId is None:
            return Response({"error": "usernameId not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = UserCrop.objects.get(usernameId=usernameId)
            user.delete()
            return Response({"message": f"User with usernameId {usernameId} deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Users.DoesNotExist:
            return Response({"error": f"User with usernameId {usernameId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class UserFurnitureView(APIView):
    def get(self, request):
        userDecorations = UserFurniture.objects.all()
        serializer = UserFurnitureSerializer(userDecorations, many=True)
        print(serializer)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserFurnitureSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request):
            type = request.data.get('type', None)
            usernameId = request.data.get('usernameId', None)

            if type is None or usernameId is None:
                return Response({"error": "Task name not provided"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                plot = UserFurniture.objects.get(type=type, usernameId=usernameId)
                plot.delete()
                return Response({"message": f"Task with name {type} deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
            except UserFurniture.DoesNotExist:
                return Response({"error": f"Task with name {type} does not exist"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class UserSettingsView(APIView):
    def get(self, request):
        userDecorations = UserSettings.objects.all()
        serializer = UserSettingsSerializer(userDecorations, many=True)
        print(serializer)
        return Response(serializer.data)

    def post(self, request):
        user = request.data.get('usernameId')
        try:
            userInstance = Users.objects.get(usernameId=user)
        except Users.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSettingsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['usernameId'] = userInstance
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request):
        usernameId = request.data.get('usernameId', None)
        if usernameId is None:
            return Response({"error": "usernameId not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = UserCrop.objects.get(usernameId=usernameId)
            user.delete()
            return Response({"message": f"User with usernameId {usernameId} deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Users.DoesNotExist:
            return Response({"error": f"User with usernameId {usernameId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


