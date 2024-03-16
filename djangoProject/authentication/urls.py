from django.urls import path
from . import views
from .views import home,login_view,create_account_view,chart_view,game_view

urlpatterns = [
    path('', views.home, name='home'),
    path('game/', views.game_view, name='game'),
    path('chart/', views.chart_view, name='chart'),
    path('login/', login_view, name='login'),
    path('create-account/', create_account_view, name='create_account'),
]
