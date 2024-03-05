from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.shortcuts import render
import uuid
from django.shortcuts import redirect
from django.urls import reverse
import requests


def cas_callback(request):
    csticket = request.GET.get('csticket')
    username = request.GET.get('username')
    fullname = request.GET.get('fullname')

#     validation_url = f"http://studentnet.cs.manchester.ac.uk/authenticate/?url={request.build_absolute_uri()}&csticket={csticket}&version=3&command=confirm&username={username}&fullname={fullname}"
    validation_url = f"https://login.manchester.ac.uk/cas//?url={request.build_absolute_uri()}&csticket={csticket}&version=3&command=confirm&username={username}&fullname={fullname}"
    response = requests.get(validation_url)

    if response.text == 'true':
        request.session['username'] = username

        request.session['fullname'] = fullname
        # 认证成功，重定向到受保护的主页
        return redirect('protected_home')
    else:
        # 认证失败，重定向到错误页面或主页，并附带错误消息
        return redirect(f"{reverse('home')}?error=Authentication+Failed")



def redirect_to_auth_service(request):
    csticket = generate_csticket(request)  # 调用上面的函数生成 CSTICKET
#     auth_service_url = f"http://studentnet.cs.manchester.ac.uk/authenticate/?url={request.build_absolute_uri(reverse('cas_callback'))}&csticket={csticket}&version=3&command=validate"
    auth_service_url = f"https://login.manchester.ac.uk/cas/?url={request.build_absolute_uri(reverse('cas_callback'))}&csticket={csticket}&version=3&command=validate"
    return redirect(auth_service_url)


def generate_csticket(request):
    csticket = str(uuid.uuid4())  # 生成随机的 CSTICKET
    request.session['csticket'] = csticket  # 保存到会话中
    return csticket


def home(request):
    return render(request, 'authentication/landing.html')


@login_required
def protected_home(request):
    return render(request, 'authentication/index.html')


def signout(request):
    return redirect('cas_ng_logout')


def game_view(request):
    return render(request, 'authentication/game_index.html')
