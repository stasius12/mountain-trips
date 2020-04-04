from rest_framework import serializers

from .models import Trip


class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = (
            'id',
            'name',
            'created_at',
            'slug',
            'date_from',
            'date_to',
            'description',
        )
