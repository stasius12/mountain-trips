from datetime import date, timedelta

import pytest
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError

from trips.models import Trip


@pytest.mark.django_db
def test_simple_create_trip():
    trip = Trip.objects.create(name='trip-1', slug='trip-1')
    assert trip.date_from == date.today()
    assert trip.date_to == date.today() + timedelta(days=7)
    trip.full_clean()


@pytest.mark.django_db
def test_extended_create_trip():
    trip = Trip.objects.create(
        name='trip-1',
        slug='trip-1',
        date_from=date.today() - timedelta(5),
        date_to=date.today(),
        description='This is description',
    )
    assert trip.date_from == date.today() - timedelta(5)
    assert trip.date_to == date.today()
    assert trip.description == 'This is description'
    trip.full_clean()


@pytest.mark.django_db
def test_create_trip_without_data():
    trip = Trip.objects.create()
    with pytest.raises(ValidationError):
        trip.full_clean()


@pytest.mark.django_db
def test_create_trip_without_slug():
    trip = Trip.objects.create(name='trip-1')
    with pytest.raises(ValidationError):
        trip.full_clean()


@pytest.mark.django_db
def test_create_trip_without_name():
    trip = Trip.objects.create(slug='trip-1')
    with pytest.raises(ValidationError):
        trip.full_clean()


@pytest.mark.django_db
def test_create_trip_slug_not_unique():
    Trip.objects.create(name='trip-1', slug='slug-1')
    with pytest.raises(
        IntegrityError,
        match='duplicate key value violates unique constraint "trips_trip_slug'
    ):
        Trip.objects.create(name='trip-1', slug='slug-1')
