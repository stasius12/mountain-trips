import random
import string
from datetime import date, timedelta

from django.db import models
from django.utils.translation import ugettext_lazy as _

from froala_editor.fields import FroalaField


def get_default_date_to():
    return date.today() + timedelta(days=7)


def photo_upload_to(instance, filename):
    filename = filename if filename else ''.join(
        random.choice(string.ascii_letters) for _ in range(10)
    )
    return f"trips/{instance.trip.slug}/{filename}"


class Trip(models.Model):
    name = models.CharField(
        _("Trip"),
        max_length=255,
    )
    created_at = models.DateTimeField(
        _("Created at"),
        auto_now_add=True,
    )
    slug = models.SlugField(
        unique=True,
    )
    date_from = models.DateField(
        _("From date"),
        blank=True,
        null=True,
        default=date.today,
        help_text=_("The date when the trip begins."),
    )
    date_to = models.DateField(
        _("To date"),
        blank=True,
        null=True,
        default=get_default_date_to,
        help_text=_("The date when the trip ends."),
    )
    description = FroalaField(
        _("Description"),
        blank=True,
    )

    def __str__(self):
        return self.name


class Photo(models.Model):
    file = models.ImageField(
        upload_to=photo_upload_to,
    )
    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
    )
    author = models.ForeignKey(
        "userprofile.UserProfile",
        null=True,
        on_delete=models.SET_NULL,
    )
    created_at = models.DateTimeField(
        _("Created at"),
        auto_now_add=True,
    )

    @property
    def url(self):
        return self.file.url
