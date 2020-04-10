from datetime import date, timedelta

import pytest

from trips.models import Trip
from trips.serializers import TripSerializer


@pytest.mark.django_db
def test_trip_serializer():
    trip = Trip.objects.create(
        name='trip-1',
        slug='trip-1',
        date_from=date.today() - timedelta(5),
        date_to=date.today(),
        description='This is description',
    )
    data = TripSerializer(trip).data
    assert list(data.keys()) == [
        'id',
        'name',
        'created_at',
        'slug',
        'date_from',
        'date_to',
        'description',
    ]
