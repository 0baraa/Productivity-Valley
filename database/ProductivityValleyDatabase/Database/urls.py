from django.urls import path
from . import views

urlpatterns = [
    path('Database/', views.Database, name='Database'),
]