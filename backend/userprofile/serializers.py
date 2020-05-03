from rest_framework.serializers import ModelSerializer

from .models import UserProfile, Participant


class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = (
            'user',
            'username',
            'profile_picture_url',
        )


class ParticipantSerializer(ModelSerializer):
    userprofile = UserProfileSerializer(read_only=True)

    class Meta:
        model = Participant
        fields = (
            'userprofile',
        )
