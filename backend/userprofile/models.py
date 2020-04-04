from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.user.username


class Participant(models.Model):
    userprofile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
    )
    trip = models.ForeignKey(
        'trips.Trip',
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f'{self.userprofile} in {self.trip}'
