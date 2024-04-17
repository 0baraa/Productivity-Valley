from datetime import timedelta
from django.utils import timezone
from django.http import JsonResponse
from django.db.models.functions import TruncDay
from django.db.models.functions import TruncDay
from django.shortcuts import render
from django.db.models import F, Sum
from django.shortcuts import get_object_or_404
from django.shortcuts import get_object_or_404
from django.db import IntegrityError
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializer import *

#might not be necessary
from django.views.decorators.csrf import csrf_exempt

#debugging
import json


class UserFarmView(APIView):
    def get(self, request):
        username = request.GET.get("usernameId")
        print(username)
        user = UserFarm.objects.filter(usernameId = username)
        print(user)
        serializer = UserFarmSerializer(user, many=True)
        return Response(serializer.data)

    def post (self, request):
        #print(request, "\n", data, "\n\n")
        serializer = UserFarmSerializer(data=request.data)
        username = request.data.get("usernameId")
        if serializer.is_valid():
            new_user = serializer.save()
            UserSeeds.objects.create(
                usernameId = new_user
            )
            UserSettings.objects.create(
                usernameId = new_user
            )
            UserPlots.objects.create(
                usernameId = username,
                x = 320,
                y = 616,
                placed = True,
            )
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

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

class MoneyPartialView(UpdateAPIView):
    queryset = UserFarm.objects.all()
    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        try:
            username = request.data.get('usernameId')
            userfarm = UserFarm.objects.get(usernameId=username)
            print(username)
        except UserFarm.DoesNotExist:
            return Response({"error": "UserFarm not found"}, status = status.HTTP_400_BAD_REQUEST) 
        serializer = UserFarmSerializer(userfarm, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(**serializer.validated_data)


        return Response(status = status.HTTP_200_OK)

class HouseView(APIView):
     def post(self, request):
        usernameId = request.data.get('usernameId', None)
        print(usernameId)
        coins = request.data.get('coins', None)
        if usernameId is None:
            return Response({"error": "Username not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = UserFarm.objects.get(usernameId = usernameId)
            if coins is None:
                xIn = request.data.get("x"),
                yIn = request.data.get("y"),
                level = request.data.get("farmHouseLevel")
                if xIn is None or yIn is None or level is None:
                    return Response({"error": "Inadequate data provided"}, status=status.HTTP_400_BAD_REQUEST)
                email = user.email
                coins = user.coins
                user.delete()
                updated = UserFarm.objects.create(
                    usernameId = usernameId,
                    farmHouseLevel = request.data.get("farmHouseLevel"),
                    x = request.data.get("x"),
                    y = request.data.get("y"),
                    email = email,
                    coins = coins
                )
                updated.save()
            else:
                level = user.farmHouseLevel
                x = user.x
                y = user.y
                email = user.email
                user.delete()
                updated = UserFarm.objects.create(
                    usernameId = usernameId,
                    farmHouseLevel = level,
                    x = x,
                    y = y,
                    email = email,
                    coins = coins
                )
                updated.save()
            return Response(status=status.HTTP_201_CREATED)
        except UserFarm.DoesNotExist:
            return Response({"error": f"User with username {usernameId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserSeedsView(APIView):
    def get(self, request):
        username = request.GET.get("usernameId")
        print(username)
        user = UserFarm.objects.get(usernameId = username)
        userSeeds = UserSeeds.objects.filter(usernameId = user)
        serializer = UserSeedsSerializer(userSeeds, many=True)
        return Response(serializer.data)

    def post(self, request):
        username = request.data.get("usernameId")
        try:
            user = UserFarm.objects.get(usernameId = username)
            tomato = request.data.get('tomato')
            sunflower = request.data.get('sunflower')
            carrot = request.data.get("carrot")
            pumpkin = request.data.get("pumpkin")
            tulip = request.data.get("tulip")
            userInstance = UserSeeds.objects.get(usernameId=user)
            if tomato is None or sunflower is None or carrot is None or pumpkin is None or tulip is None:
                return Response({"error": "Insufficient crop fields given"}, status=status.HTTP_400_BAD_REQUEST)
            userInstance.delete()
            newSeeds = UserSeeds.objects.create(
                usernameId = user,
                tomato = tomato,
                carrot = carrot,
                sunflower = sunflower,
                pumpkin = pumpkin,
                tulip = tulip
                )
            newSeeds.save()
            return Response(status=status.HTTP_200_OK)
        except UserSeeds.DoesNotExist:
            userSeeds = UserSeeds.objects.create(
                usernameId = user,
                tomato = tomato,
                carrot = carrot,
                sunflower = sunflower,
                pumpkin = pumpkin,
                tulip = tulip
                )
            userSeeds.save()
            return Response(status=status.HTTP_200_OK)
        except UserFarm.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
            
        
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

class UserPlotsView(APIView):
    def get(self, request):
        username = request.GET.get('usernameId')
        userPlots = UserPlots.objects.filter(usernameId = username)
        serializer = UserPlotsSerializer(userPlots, many=True)
        return Response(serializer.data)
    def post(self, request):
        user = request.data.get('usernameId')
        plotid = request.data.get('plotId')
        serializer = UserPlotsSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            if "unique set" in str(e):
                try:
                    userPlotInstance = UserPlots.objects.get(usernameId=user, plotId = plotid)
                    print()
                    userPlotInstance.delete()
                    serializer = UserPlotsSerializer(data=request.data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                except UserPlots.DoesNotExist:
                    return Response({"error": "Plot can't be replaced with given username and plotId"}, status=status.HTTP_404_NOT_FOUND)
            else:
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

class TasksView(APIView):
    def get(self, request):
        username = request.GET.get('usernameId', None)
        userTasks = Tasks.objects.filter(usernameId=username)
        serializer = TasksSerializer(userTasks, many=True)
        return Response(serializer.data)
    def post (self, request):
        user = request.data.get('usernameId')
        plotid = request.data.get('plotId')
        serializer = TasksSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            if "unique set" in str(e):
                try:
                    userTaskInstance = Tasks.objects.get(usernameId=user, plotId=plotid)
                    userTaskInstance.delete()
                    serializer = TasksSerializer(data=request.data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                except Tasks.DoesNotExist:
                    return Response({"error": "Task can't be replaced with given username and plotId"}, status=status.HTTP_404_NOT_FOUND)
            else:
                print(e)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    def delete(self, request):
        plotId = request.data.get('plotId', None)
        username = request.data.get('usernameId', None)

        if plotId is None or usernameId is None:
            return Response({"error": "Insufficient Task fields provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            task = Tasks.objects.get(plotId=plotId, usernameId=username)
            task.delete()
            return Response({"message": f"Task with name {plotId} deleted successfully"}, status=status.HTTP_200_OK)
        except Tasks.DoesNotExist:
            return Response({"error": f"Task with name {plotId} does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserDatesView(APIView):
    def get(self, request):
        username = request.GET.get("usernameId")
        userDates = UserDates.objects.all(usernameId = username)
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
        username = request.GET.get('usernameId')
        userDecorations = UserDecorations.objects.filter(usernameId = username)
        serializer = UserDecorationsSerializer(userDecorations, many=True)
        print(serializer)
        return Response(serializer.data)
    def post(self, request):
        user = request.data.get('usernameId')
        decType = request.data.get('type')
        print(user, decType)
        serializer = UserDecorationsSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            if "unique set" in str(e):
                try:
                    userDecInstance = UserDecorations.objects.get(usernameId=user, type=decType)
                    userDecInstance.delete()
                    serializer = UserDecorationsSerializer(data=request.data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                except UserDecorations.DoesNotExist:
                    return Response({"error": "Decoration can't be replaced with given username and plotId"}, status=status.HTTP_404_NOT_FOUND)
            else:
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

class UserFurnitureView(APIView):
    def get(self, request):
        username = request.GET.get('usernameId')
        userFurniture = UserFurniture.objects.filter(usernameId = username)
        serializer = UserFurnitureSerializer(userFurniture, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.data.get('usernameId')
        furnType = request.data.get('type')
        serializer = UserFurnitureSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            if "unique set" in str(e):
                try:
                    userFurnInstance = UserFurniture.objects.get(usernameId=user, type=furnType)
                    userFurnInstance.delete()
                    serializer = UserFurnitureSerializer(data=request.data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                except UserFurniture.DoesNotExist:
                    return Response({"error": "Furniture can't be replaced with given username and plotId"}, status=status.HTTP_404_NOT_FOUND)
            else:
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
        username = request.GET.get('usernameId')
        print(username)
        user = UserFarm.objects.filter(usernameId = username).first()
        print(user)
        userSettings = UserSettings.objects.filter(usernameId = user)
        serializer = UserSettingsSerializer(userSettings, many = True)
        #print(serializer)
        return Response(serializer.data)

    def post(self, request):
        username = request.data.get('usernameId')
        user = UserFarm.objects.get(usernameId = username)
        try:
            pomTimer = request.data.get('workTime')
            shortBreak = request.data.get('shortBreakTime')
            longBreak = request.data.get('longBreakTime')
            longBreakInterval = request.data.get('longBreakInterval')
            autoStartPom = request.data.get('autoStartPomodoro')
            autoStartBreak = request.data.get('autoStartBreak')
            fontSize = request.data.get('fontSize')
            fontStyle = request.data.get('font')
            userInstance = UserSettings.objects.get(usernameId=user)
            userInstance.delete()
            newSettings = UserSettings.objects.create(
                usernameId = user,
                pomTimer = pomTimer,
                shortBreak = shortBreak,
                longBreak = longBreak,
                longBreakInterval = longBreakInterval,
                autoStartPom = autoStartPom,
                autoStartBreak = autoStartBreak,
                fontSize = fontSize,
                fontStyle = fontStyle
            )
            newSettings.save()
            return Response(status=status.HTTP_201_CREATED)
        except UserSettings.DoesNotExist:
            userInstance = UserSettings.objects.create(
                usernameId = user,
                pomTimer = pomTimer,
                shortBreak = shortBreak,
                longBreak = longBreak,
                longBreakInterval = longBreakInterval,
                autoStartPom = autoStartPom,
                autoStartBreak = autoStartBreak,
                fontSize = fontSize,
                fontStyle = fontStyle,
                )
            userInstance.save()
            print("No User settings found - creating new")
            return Response(status=status.HTTP_201_CREATED)
            #return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSettingsSerializer(data=request.data)
        if serializer.is_valid():
            #serializer.validated_data['usernameId'] = userInstance
            serializer.save()
            
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
