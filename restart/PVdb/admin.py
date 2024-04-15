from django.contrib import admin
from .models import UserFarm, Tasks, UserDecorations, UserSeeds, UserFurniture, UserSettings, UserPlots

admin.site.register(UserFarm)
admin.site.register(Tasks)
admin.site.register(UserFurniture)
admin.site.register(UserDecorations)
admin.site.register(UserSeeds)
admin.site.register(UserSettings)
admin.site.register(UserPlots)

