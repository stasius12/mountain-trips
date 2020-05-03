from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import ugettext_lazy as _


def photo_upload_to(instance, filename):
    filename = filename if filename else instance.user.id
    return f"userprofile/{instance.user.username}/{filename}"


class UserProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
    )
    username = models.CharField(
        _("Username"),
        max_length=50,
        blank=True,
    )
    profile_picture = models.ImageField(
        upload_to=photo_upload_to,
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.user.username

    @property
    def profile_picture_url(self):
        if self.profile_picture:
            return self.profile_picture.url


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
