from django.contrib import admin

from .models import Trip


@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'slug',
        'date_from',
        'date_to',
        'duration',
        'participant_count',
    ]

    def duration(self, obj):
        duration = (obj.date_to - obj.date_from).days
        return f"{duration} day{'s' if duration > 1 else ''}"

    def participant_count(self, obj):
        return obj.participant_set.count()
