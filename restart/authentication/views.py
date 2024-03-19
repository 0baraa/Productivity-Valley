from django.shortcuts import render, redirect
from django.contrib import messages
from validate_email import validate_email
from .models import User
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from helpers.decorators import auth_user_should_not_access
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str, DjangoUnicodeDecodeError
from .utils import generate_token
from django.core.mail import EmailMessage
from django.conf import settings
import threading
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model

class EmailThread(threading.Thread):

    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()


def home(request):
    return render(request, 'authentication/landing.html')


def send_activation_email(user, request):
    current_site = get_current_site(request)
    email_subject = 'Activate your account'
    email_body = render_to_string('authentication/activate.html', {
        'user': user,
        'domain': current_site,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': generate_token.make_token(user)
    })

    email = EmailMessage(subject=email_subject, body=email_body,
                         from_email=settings.EMAIL_FROM_USER,
                         to=[user.email]
                         )

    if not settings.TESTING:
        EmailThread(email).start()


@auth_user_should_not_access
def register(request):
    if request.method == "POST":
        context = {'has_error': False, 'data': request.POST}
        email = request.POST.get('email')
        username = request.POST.get('username')
        password = request.POST.get('password')
        password2 = request.POST.get('password2')

        if len(password) < 6:
            messages.add_message(request, messages.ERROR,
                                 'Password should be at least 6 characters')
            context['has_error'] = True

        if password != password2:
            messages.add_message(request, messages.ERROR,
                                 'Password mismatch')
            context['has_error'] = True

        if not validate_email(email):
            messages.add_message(request, messages.ERROR,
                                 'Enter a valid email address')
            context['has_error'] = True

        if not username:
            messages.add_message(request, messages.ERROR,
                                 'Username is required')
            context['has_error'] = True

        if User.objects.filter(username=username).exists():
            messages.add_message(request, messages.ERROR,
                                 'Username is taken, choose another one')
            context['has_error'] = True

            return render(request, 'authentication/register.html', context, status=409)

        if User.objects.filter(email=email).exists():
            messages.add_message(request, messages.ERROR,
                                 'Email is taken, choose another one')
            context['has_error'] = True

            return render(request, 'authentication/register.html', context, status=409)

        if context['has_error']:
            return render(request, 'authentication/register.html', context)

        user = User.objects.create_user(username=username, email=email)
        user.set_password(password)
        user.save()

        if not context['has_error']:

            send_activation_email(user, request)

            messages.add_message(request, messages.SUCCESS,
                                 'We sent you an email to verify your account')
            return redirect('login')
            # return render(request, 'authentication/game_index.html')


    return render(request, 'authentication/register.html')


# @auth_user_should_not_access
def login_user(request):

    if request.method == 'POST':

        context = {'data': request.POST}
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user and not user.is_email_verified:
            messages.add_message(request, messages.ERROR,
                                 'Email is not verified, please check your email inbox')
            return render(request, 'authentication/login.html', context, status=401)

        if not user:
            messages.add_message(request, messages.ERROR,
                                 'Invalid credentials, try again')
            return render(request, 'authentication/login.html', context, status=401)

        login(request, user)

        messages.add_message(request, messages.SUCCESS,
                             f'Welcome {user.username}')

        return redirect(reverse('game'))
        # return render(request, 'authentication/game_index.html')

    return render(request, 'authentication/login.html')


def logout_user(request):

    logout(request)

    messages.add_message(request, messages.SUCCESS,
                         'Successfully logged out')

    return redirect(reverse('login'))


def activate_user(request, uidb64, token):

    try:
        uid = force_str(urlsafe_base64_decode(uidb64))

        user = User.objects.get(pk=uid)

    except Exception as e:
        user = None

    if user and generate_token.check_token(user, token):
        user.is_email_verified = True
        user.save()

        messages.add_message(request, messages.SUCCESS,
                             'Email verified, you can now login')
        return redirect(reverse('login'))

    return render(request, 'authentication/activate-failed.html', {"user": user})

# @login_required
def game_view(request):
    return render(request, 'authentication/game_index.html')



def email_check(request):
    if request.method == 'POST':
        context = {'has_error': False, 'data': request.POST}
        email = request.POST.get('email')
        # user = authenticate(request, email=email)
        user = User.objects.filter(email=email).first()
        if not validate_email(email):
            messages.add_message(request, messages.ERROR,
                                 'Enter a valid email address')
            context['has_error'] = True

        if not user:
            messages.add_message(request, messages.SUCCESS,
                                 'Email does not exist')
            context['has_error'] = True
            return render(request, 'authentication/email_check.html', context)
        if context['has_error']:
            return render(request, 'authentication/email_check.html', context)

        user_id = user.pk
        request.session['user_id_for_reset'] = user_id
        user.save()

        if not context['has_error']:
            send_reset_email(user, request)
            messages.add_message(request, messages.SUCCESS,
                                 'We sent you an email to verify your account')
            return redirect('email_check')


    return render(request, 'authentication/email_check.html')

User = get_user_model()
def reset(request):
    if request.method == 'POST':
        context = {'has_error': False, 'data': request.POST}
        new_username = request.POST.get('username')
        # user_form = UserUpdateForm(request.POST, instance=request.user)
        new_password = request.POST.get('password')
        password2 = request.POST.get('password2')
        # context = {'user_form': user_form, 'has_error': False}

        user_id = request.session.get('user_id_for_reset', None)
        print("User ID for reset:", user_id)
        # user = User.objects.get(pk=user_id)
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            messages.error(request, "No user found for this request.")
            return redirect('authentication/activate-failed')  # 重定向到错误处理视图或首页

        if User.objects.filter(username=new_username).exists():
            if new_username != user.username:
                messages.add_message(request, messages.ERROR,
                                     'Username is taken, choose another one')
                context['has_error'] = True



        if new_password and len(new_password) < 6:
            messages.add_message(request, messages.ERROR, 'Password should be at least 6 characters')
            context['has_error'] = True

        if new_password != password2:
            messages.add_message(request, messages.ERROR, 'Password mismatch')
            context['has_error'] = True

        if context['has_error']:
            return render(request, 'authentication/reset.html', context)

        # 获取用户实例
        # user_id = request.session.get('user_id_for_reset', None)
        if user_id:
            # user = User.objects.get(pk=user_id)
            user.set_password(new_password)  # 使用表单提交的密码
            user.username = new_username
            user.save()
            del request.session['user_id_for_reset']  # 删除会话中的用户ID
            messages.add_message(request, messages.SUCCESS, 'Your password has been reset successfully')
            return redirect('login')

    return render(request, 'authentication/reset.html')

def send_reset_email(user, request):
    current_site = get_current_site(request)
    email_subject = 'Reset your password'
    email_body = render_to_string('authentication/activate_reset.html', {
        'user': user,
        'domain': current_site,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': generate_token.make_token(user)
    })

    email = EmailMessage(subject=email_subject, body=email_body,
                         from_email=settings.EMAIL_FROM_USER,
                         to=[user.email]
                         )

    if not settings.TESTING:
        EmailThread(email).start()

def activate_reset(request, uidb64, token):

    try:
        uid = force_str(urlsafe_base64_decode(uidb64))

        user = User.objects.get(pk=uid)

    except Exception as e:
        user = None

    if user and generate_token.check_token(user, token):
        user.is_email_verified = True
        user.save()

        messages.add_message(request, messages.SUCCESS,
                             'Email verified, you can now reset your password')
        return redirect(reverse('reset'))

    return render(request, 'authentication/activate-failed.html', {"user": user})