from rest_framework import serializers

from .models import Trip, Photo
from userprofile.serializers import ParticipantSerializer


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = (
            'id',
            'url',
            'trip_id',
            'author_id',
        )


class TripSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, source='photo_set')
    participants = ParticipantSerializer(many=True, source='participant_set')
    participants_count = serializers.IntegerField(
        source='participant_set.count',
    )
    duration = serializers.SerializerMethodField()

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
            'participants_count',
            'duration',

            'participants',
            'photos',
        )

    def get_duration(self, obj):
        return (obj.date_to - obj.date_from).days
