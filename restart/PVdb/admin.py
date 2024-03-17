from django.contrib import admin
from .models import Users, Tasks, Decorations, Crops, UserDecorations, UserCrop

admin.site.register(Users)
admin.site.register(Tasks)
admin.site.register(Decorations)
admin.site.register(Crops)
admin.site.register(UserDecorations)
admin.site.register(UserCrop)
