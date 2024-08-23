from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("Auth.urls")),
    path("issues/", include("issues.urls")),
    path("alerts/", include("PublicAlerts.urls")),
]
