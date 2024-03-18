"""
URL configuration for restart project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from authentication import views as auth_views


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', include('todo.urls')),
    # path('', include('authentication.urls')),
    path('', auth_views.home, name='home'),  # 将根 URL 指向登录视图
    path('auth/', include('authentication.urls')),
    path('', include('PVdb.urls')),
]


handler404 = "helpers.views.handle_not_found"
handler500 = "helpers.views.handle_server_error"