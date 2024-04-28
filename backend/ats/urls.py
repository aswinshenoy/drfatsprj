from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('application.urls')),
    path('', include('job.urls')),
]

urlpatterns = [
    path("api/", include(urlpatterns))
] + static(
    settings.STATIC_URL, document_root=settings.STATIC_ROOT
)
