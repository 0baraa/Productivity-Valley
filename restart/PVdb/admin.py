from django.contrib import admin
from .models import UserFarm, Tasks, Decorations, UserDecorations, UserSeeds

# admin.site.register(Users)
admin.site.register(Tasks)
admin.site.register(Decorations)
admin.site.register(UserDecorations)
admin.site.register(UserSeeds)
