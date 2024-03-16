from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.shortcuts import render
import uuid
from django.shortcuts import redirect
from django.urls import reverse
import requests
from django.contrib.auth import authenticate,login
from django.contrib import messages
from django.contrib.auth.models import User


def home(request):
    return render(request, 'authentication/landing.html')


def game_view(request):
    return render(request, 'authentication/game_index.html')


def chart_view(request):
    data = {
        'labels': ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        'data': [12, 19, 3, 5, 2, 3],
    }
    return render(request, 'chart.html', {'chart_data': data})

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('game')
        else:
            messages.error(request, 'Invalid username or password')
    return render(request, 'authentication/login.html')

def create_account_view(request):
    if request.method == 'POST':
        userEmail = request.POST.get('email')
        username = request.POST.get('username')
        userPassword1 = request.POST.get('password1')
        userPassword2 = request.POST.get('password2')
        firstName = request.POST.get('first_name')
        lastName = request.POST.get('last_name')
        try:
            user = User.objects.get(email=userEmail)
            msg = 'User already registered'
            return render(request, 'authentication/create_account.html', {'msg': msg})
        except User.DoesNotExist:
            if userPassword1 != userPassword2:
                error_msg = 'Passwords do not match'
                return render(request, 'authentication/create_account.html', {'error_msg': error_msg})
            else:
                user = User.objects.create_user(username, userEmail, userPassword1)
                user.first_name = firstName
                user.last_name = lastName
                user.save()
                return redirect('login')
    else:
        return render(request, 'authentication/create_account.html')
