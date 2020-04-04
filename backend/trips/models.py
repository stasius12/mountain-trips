from datetime import date, timedelta

from django.db import models
from django.utils.translation import ugettext_lazy as _

from autoslug import AutoSlugField
from froala_editor.fields import FroalaField


def get_default_date_to():
    return date.today() + timedelta(days=7)


class Trip(models.Model):
    name = models.CharField(
        _("Trip"),
        max_length=255,
    )
    created_at = models.DateTimeField(
        _("Created at"),
        auto_now_add=True,
    )
    slug = AutoSlugField(
        _("Slug"),
        populate_from='name',
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
