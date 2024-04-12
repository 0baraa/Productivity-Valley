"""
URL configuration for apiDB project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from PVdb.views import *
from .views import UsersView,PomodoroStatsView
urlpatterns = [
# path('admin/', admin.site.urls),
path('users/', UsersView.as_view(), name='Users'),
path('users/change-money/', UsersView.as_view(), name='change-money'),
path('decorations', DecorationsView.as_view(), name='Decorations'),
path('crops', CropsView.as_view(), name='Crops'),
path('user-decorations/', UserDecorationsView.as_view(), name='user_decorations'),
path('user-crops/', UserCropsView.as_view(), name='user_crops'),
path('user-furniture/', UserFurnitureView.as_view(), name='user_furniture'),
path('tasks/', TasksView.as_view(), name='tasks'),
path('user-dates/', UserDatesView.as_view(), name='user_dates'),
path('pomodoro_stats/<str:username>/', PomodoroStatsView.as_view(), name='pomodoro_stats'),
]
