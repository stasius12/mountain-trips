from rest_framework.generics import RetrieveAPIView

from .serializers import UserProfileSerializer


class Profile(RetrieveAPIView):
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user.userprofile
