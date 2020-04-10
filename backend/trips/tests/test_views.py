import pytest

from trips.models import Trip


def format_date(date):
    return date.strftime('%Y-%m-%d')


@pytest.fixture
def simple_trip(db):
    return Trip.objects.create(name='trip-1', slug='trip-1')


def test_trip_view_set(api_client, simple_trip, get_formatted_field_value):
    response = api_client.get('/trips/', format='json')
    data = response.data
    assert response.status_code == 200
    assert len(data) == 1
    fields = [
        ('id', None),
        ('name', None),
        ('slug', None),
        ('date_from', format_date),
        ('date_to', format_date),
        ('description', None),
    ]
    for field_name, formatter in fields:
        assert data[0][field_name] == get_formatted_field_value(
            simple_trip,
            field_name,
            formatter
        )
