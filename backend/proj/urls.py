from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),

    path('froala_editor/', include('froala_editor.urls')),

    path('', include('trips.urls')),
]
