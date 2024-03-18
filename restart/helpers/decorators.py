from django.contrib.auth.decorators import user_passes_test
from authentication.models import User
# from django.http import JsonResponse
# from functools import wraps


def check_user(user):
    return not user.is_authenticated


user_logout_required = user_passes_test(check_user, 'auth/game', None)


def auth_user_should_not_access(viewfunc):
    return user_logout_required(viewfunc)

# def check_email_exist(view_func):
#     @wraps(view_func)
#     def _wrapped_view(request, *args, **kwargs):
#         # 从请求中获取电子邮件参数
#         email = request.POST.get('email', None)
#
#         # 检查电子邮件是否存在于数据库中
#         if email and User.objects.filter(email=email).exists():
#             return view_func(request, *args, **kwargs)
#         else:
#             # 如果电子邮件不存在，返回错误信息
#             return JsonResponse({'error': 'Email does not exist'}, status=400)
#
#     return _wrapped_view

# def check_email_exist(request):
#     # 从请求中获取电子邮件参数
#     email = request.GET.get('email', None)
#
#     # 检查电子邮件是否存在于数据库中
#     if email:
#         email_exist = User.objects.filter(email=email).exists()
#         if email_exist:
#             return JsonResponse({'email_exist': True})
#         else:
#             return JsonResponse({'email_exist': False})
#     else:
#         return JsonResponse({'error': 'Email parameter is missing'}, status=400)
