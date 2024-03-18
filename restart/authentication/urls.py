from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('game', views.game_view, name='game'),
    path('login', views.login_user, name='login'),
    path('register', views.register, name='register'),
    path('reset', views.reset, name='reset'),
    path('email_check', views.email_check, name='email_check'),
    path("logout_user", views.logout_user, name='logout_user'),
    path('activate-user/<uidb64>/<token>',
         views.activate_user, name='activate'),
    path('activate-reset/<uidb64>/<token>',
         views.activate_reset, name='activate_reset'),

]