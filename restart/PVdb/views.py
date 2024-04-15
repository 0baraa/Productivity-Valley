from django.db.models.functions import TruncDay
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
from django.shortcuts import get_object_or_404

#might not be necessary
from django.views.decorators.csrf import csrf_exempt

#debugging
import json

class NewUserFarmView(APIView):
    def post(self, request):
        data = {"usernameId": request.data.get("usernameId"),
                "email": request.data.get("email"),
                "coins": request.data.get("coins"),
                "farmHouseLevel": request.data.get("farmHouseLevel"),
                "x": request.data.get("x"),
                "y": request.data.get("y")
                }
        

class UserFarmView(APIView):
    def get(self, request):
        #print("\n\n\n\nthis is the request: \n\n\n\n",request.GET.get('usernameId'))
        #userId = request.GET.get.('usernameId')
        #data = Users.objects.filter(usernameId = userId).values()
        output = [{"usernameId":output.usernameId,
                  "email":output.email,
                  "coins":output.coins,
                  "farmHouseLevel":output.farmHouseLevel,
                  "x":output.x,
                  "y":output.y}
                  for output in UserFarm.objects.filter(usernameId = request.GET.get('usernameId'))]
        return Response(output)
    #@csrf_exempt
    def post (self, request):
        print("\n\n\n\n\n\n\n\n\n notice me senpai\n\n\n\n\n\n\n\n\n")
        print("\n\n\n this is request data to post \n")
        #print(request, "\n", data, "\n\n")

        serializer = UserFarmSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    def delete(self, request):
        print(" delete request::::::::::::::::::::",request)
        print(request.data)
        username = request.data.get('usernameId', None)
        if username is None:
            return Response({"error": "Username not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = UserFarm.objects.get(usernameId=username)
            user.delete()
            return Response({"message": f"User with username {username} deleted successfully"}, status=status.HTTP_200_OK)
        except UserFarm.DoesNotExist:
            return Response({"error": f"User with username {username} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class MoneyView(APIView):
     def post(self, request):
        usernameId = request.data.get('usernameId', None)
        coins = request.data.get('coins', None)
        if usernameId is None or money is None:
            return Response({"error": "Username or amount of money not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = UserFarm.objects.get(usernameId=usernameId)
            user.coins = coins
            user.save()
            return Response({"message": f"Money updated successfully for user {usernameId}"}, status=status.HTTP_200_OK)
        except UserFarm.DoesNotExist:
            return Response({"error": f"User with username {usernameId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class HouseView(APIView):
     def post(self, request):
        usernameId = request.data.get('usernameId', None)
        farmHouseLevel = request.data.get('farmHouseLevel', 1)
        farm_x = request.data.get('x', 70)
        farm_y = request.data.get('y', 570)
        if usernameId is None:
            return Response({"error": "Username not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = UserFarm.objects.get(usernameId=usernameId)
            user.farmHouseLevel = farmHouseLevel
            user.x = farm_x
            user.y = farm_y
            user.save()
            return Response({"message": f"Money updated successfully for user {usernameId}"}, status=status.HTTP_200_OK)
        except UserFarm.DoesNotExist:
            return Response({"error": f"User with usernameId {usernameId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class TasksView(APIView):
    def get(self, request):
        username = request.data.get('usernameId', None)
        userTasks = Tasks.objects.filter(usernameId=username)
        serializer = TasksSerializer(userTasks, many=True)
        return Response(serializer.data)
    def post (self, request):
        user = request.data.get('usernameId')
        plotid = request.data.get('plotId')
        try:
            userInstance = Tasks.objects.get(usernameId=user, plotId=plotid)
            userInstance.delete()
        except Tasks.DoesNotExist:
            print("Task not found, making new")
        serializer = TasksSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    def delete(self, request):
        plotId = request.data.get('plotId', None)
        username = request.data.get('usernameId', None)

        if plotId is None or usernameId is None:
            return Response({"error": "Task name not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            task = Tasks.objects.get(plotId=plotId, usernameId=username)
            task.delete()
            return Response({"message": f"Task with name {plotId} deleted successfully"}, status=status.HTTP_200_OK)
        except Tasks.DoesNotExist:
            return Response({"error": f"Task with name {plotId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# class IncreasePomodoroView(APIView):
#      def post(self, request):
#         usernameId = request.data.get('usernameId', None)
#         plotId=request.data.get('plotId', None)
#         if usernameId is None or plotId is None:
#             return Response({"error": "usernameId or amount of money not provided"}, status=status.HTTP_400_BAD_REQUEST)
#         try:
#             Tasks.objects.filter(usernameId=usernameId, plotId=plotId).update(pomodorosCompleted=F('pomodorosCompleted') + 1)
#             return Response({"message": f"Task status updated successfully for user {usernameId}"}, status=status.HTTP_200_OK)
#         except Users.DoesNotExist:
#             return Response({"error": f"User with usernameId {usernameId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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



class UserDecorationsView(APIView):
    def get(self, request):
        username = request.data.get('usernameId')
        userDecorations = UserDecorations.objects.filter(usernameId = username)
        serializer = UserDecorationsSerializer(userDecorations, many=True)
        print(serializer)
        return Response(serializer.data)
    def post(self, request):
        print(request.data)
        user = request.data.get('usernameId', None)
        type = request.data.get('type', None)
        try:
            userInstance = UserDecorations.objects.get(usernameId=user, type=type)
            userInstance.delete()
        except UserDecorations.DoesNotExist:
            print("user decoration not found, making new")
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
                return Response({"message": f"Task with name {type} deleted successfully"}, status=status.HTTP_200_OK)
            except UserDecorations.DoesNotExist:
                return Response({"error": f"Task with name {type} does not exist"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserPlotsView(APIView):
    def get(self, request):
        username = request.data.get('usernameId')
        userPlots = UserPlots.objects.filter(usernameId = username)
        serializer = UserPlotsSerializer(userPlots, many=True)
        return Response(serializer.data)
    def post(self, request):
        print("plots request::::::::::", request.data)
        user = request.data.get('usernameId')
        plotid = request.data.get('plotId')
        try:
            userInstance = UserPlots.objects.get(usernameId=user, plotId=plotid)
            userInstance.delete()
        except UserPlots.DoesNotExist:
            print("user plot not found, making new")
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
                plot = UserPlots.objects.get(plotId=plotId, usernameId=usernameId)
                plot.delete()
                return Response({"message": f"Task with name {plotId} deleted successfully"}, status=status.HTTP_200_OK)
            except UserPlots.DoesNotExist:
                return Response({"error": f"Task with name {plotId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserSeedsView(APIView):
    def get(self, request):
        username = request.data.get("usernameId")
        userSeeds = UserSeeds.objects.filter(usernameId = username)
        serializer = UserSeedsSerializer(userSeeds, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.data.get("usernameId")
        seed_data = {
            'usernameId': UserFarm.objects.get(usernameId = user),
            'tomato': request.data.get("tomato"),
            'sunflower': request.data.get("sunflower"),
            'carrot': request.data.get("carrot"),
            'pumpkin': request.data.get("pumpkin"),
            'tulip': request.data.get("tulip"),
        }
        #user = user.replace("'", "")
        print("user: "+user)
        #print(request.data)
        try:
            userInstance = UserSeeds.objects.get(usernameId=user)
            userInstance.delete()
        except UserSeeds.DoesNotExist:
            print("user seeds not found, making new")
            ##return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        #dataIn = json.loads(str(request.data, encoding='utf-8'))
        serializer = UserSeedsSerializer(data=seed_data)
        print(serializer)
        if serializer.is_valid():
            print("fields are valid")
            serializer.save(owner=request.user.usernameId)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request):
        usernameId = request.data.get('usernameId', None)
        if usernameId is None:
            return Response({"error": "usernameId not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = UserSeeds.objects.get(usernameId=usernameId)
            user.delete()
            return Response({"message": f"User with usernameId {usernameId} deleted successfully"}, status=status.HTTP_200_OK)
        except UserDecorations.DoesNotExist:
            return Response({"error": f"User with usernameId {usernameId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class UserFurnitureView(APIView):
    def get(self, request):
        username = request.data.get('usernameId')
        userFurniture = UserFurniture.objects.filter(usernameId = username)
        serializer = UserFurnitureSerializer(userFurniture, many=True)
        #print(serializer)
        return Response(serializer.data)

    def post(self, request):
        user = request.data.get('usernameId')
        type = request.data.get('type')
        try:
            userInstance = UserFurniture.objects.get(usernameId=user, type=type)
            userInstance.delete()
        except UserFurniture.DoesNotExist:
            print("user furniture not found, making new")
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
                furniture = UserFurniture.objects.get(type=type, usernameId=usernameId)
                furniture.delete()
                return Response({"message": f"Furniture with name {type} deleted successfully"}, status=status.HTTP_200_OK)
            except UserFurniture.DoesNotExist:
                return Response({"error": f"Furniture with name {type} does not exist"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class UserSettingsView(APIView):
    def get(self, request):
        username = request.data.get('usernameId')
        userSettings = UserSettings.objects.filter(usernameId = username)
        serializer = UserSettingsSerializer(userSettings, many=True)
        #print(serializer)
        return Response(serializer.data)

    def post(self, request):
        user = request.data.get('usernameId')
        try:
            userInstance = UserSettings.objects.get(usernameId=user)
            userInstance.delete()
        except UserSettings.DoesNotExist:
            print("No User settings found, creating new")
            #return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSettingsSerializer(data=request.data)
        if serializer.is_valid():
            #serializer.validated_data['usernameId'] = userInstance
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request):
        usernameId = request.data.get('usernameId', None)
        if usernameId is None:
            return Response({"error": "usernameId not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = UserSettings.objects.get(usernameId=usernameId)
            user.delete()
            return Response({"message": f"User with usernameId {usernameId} deleted successfully"}, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({"error": f"User with usernameId {usernameId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



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


# class TaskCompletedView(APIView):
#      def post(self, request):
#         username = request.data.get('usernameId', None)
#         plotId = request.data.get('plotId', None)
#         if usernameId is None or plotId is None:
#             return Response({"error": "usernameId or amount of money not provided"}, status=status.HTTP_400_BAD_REQUEST)
#         try:
#             Tasks.objects.filter(usernameId=username, plotId=plotId).update(completed=True)
#             return Response({"message": f"Task completed successfully for user {usernameId}"}, status=status.HTTP_200_OK)
#         except Users.DoesNotExist:
#             return Response({"error": f"User with usernameId {usernameId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
# class PlotView(APIView):
#      def post(self, request):
#         usernameId = request.data.get('usernameId', None)
#         plots = request.data.get('plots', None)
#         if usernameId is None:
#             return Response({"error": "usernameId not provided"}, status=status.HTTP_400_BAD_REQUEST)
#         try:
#             user = Users.objects.get(usernameId=usernameId)
#             user.plots = plots
#             user.save()
#             return Response({"message": f"Plots updated successfully for user {usernameId}"}, status=status.HTTP_200_OK)
#         except Users.DoesNotExist:
#             return Response({"error": f"User with usernameId {usernameId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# class DecorationsView(APIView):

#     def post(self, request):
#         serializer = DecorationsSerializer(data=request.data)
#         if not serializer.is_valid():  # 检查序列化器是否有效
#             print(serializer.errors)  # 打印错误信息
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # 返回错误信息和400状态码

#         # 如果数据有效，保存装饰项并返回成功响应
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     def get(self, request):
#         output = [{"name":output.name,
#                   "price":output.price}
#                   for output in Decorations.objects.all()]
#         return Response(output)
#     # def post (self, request):
#     #     serializer = DecorationsSerializer(data=request.data)
#     #     if serializer.is_valid(raise_exception=True):
#     #         serializer.save()
#     #         return Response(serializer.data)
#     def delete(self, request):
#         name = request.data.get('name', None)
#         if name is None:
#             return Response({"error": "Decoration name not provided"}, status=status.HTTP_400_BAD_REQUEST)
#         try:
#             decoration = Decorations.objects.get(name=name)
#             decoration.delete()
#             return Response({"message": f"Decoration with name {name} deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
#         except Decorations.DoesNotExist:
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
#         except Crops.DoesNotExist:
#             return Response({"error": f"Crop with name {name} does not exist"}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

