from django.contrib import admin

from .models import UserProfile, Participant


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = [
        'user'
    ]


@admin.register(Participant)
class ParticipantAdmin(admin.ModelAdmin):
    list_display = [
        'userprofile',
        'trip'
    ]
