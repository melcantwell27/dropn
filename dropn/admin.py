from django.contrib import admin
from .models import DanceClass, User, Studio

admin.site.register(DanceClass)
admin.site.register(Studio)
admin.site.register(User)