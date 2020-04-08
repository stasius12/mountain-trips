from rest_framework import viewsets

from .models import Trip
from .serializers import TripSerializer


class TripViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for listing or retrieving trips
    """
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    lookup_field = 'slug'
