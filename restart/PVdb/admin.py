from django.contrib import admin
from .models import Users, Tasks, UserDecorations, UserCrop

# admin.site.register(Users)
admin.site.register(Tasks)
admin.site.register(UserDecorations)
admin.site.register(UserCrop)
