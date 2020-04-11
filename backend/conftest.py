import uuid

import pytest
from rest_framework.test import APIClient


@pytest.fixture
def create_user(db, django_user_model):
    """ Fixture returning method to create user.
    It is possible than to add some custom kwargs
    """
    def make_user(**kwargs):
        kwargs['password'] = 'password'
        if 'username' not in kwargs:
            kwargs['username'] = str(uuid.uuid4())
        return django_user_model.objects.create_user(**kwargs)
    return make_user


@pytest.fixture
def api_client(create_user):
    client = APIClient()
    user = create_user()
    client.force_authenticate(user=user)
    yield client
    client.force_authenticate(user=None)


@pytest.fixture
def get_formatted_field_value():
    """ Fixture providing formatted value obtained from object."""
    def inner(obj, field_name, formatter):
        field_value = getattr(obj, field_name)
        return formatter(field_value) if formatter is not None else field_value
    return inner
