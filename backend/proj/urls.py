from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),

    path('froala_editor/', include('froala_editor.urls')),

    path('', include('trips.urls')),
    path('userprofile/', include('userprofile.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
