from django.urls import path
from django_cas_ng.views import LoginView as CASLoginView, LogoutView as CASLogoutView
from . import views
from .views import home, protected_home, signout

urlpatterns = [
    path('', views.home, name='home'),
    path('protected/', views.protected_home, name='protected_home'),  # 为受保护的主页视图添加路径
    path('accounts/login/', CASLoginView.as_view(), name='cas_ng_login'),
    path('accounts/logout/', CASLogoutView.as_view(), name='cas_ng_logout'),
    path('signout/', views.signout, name='signout'),
    path('redirect_to_auth/', views.redirect_to_auth_service, name='redirect_to_auth'),
    path('cas_callback/', views.cas_callback, name='cas_callback'),
    path('game/', views.game_view, name='game'),
]
