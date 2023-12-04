"""
URL configuration for team5_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('authentication.urls')),
    path('canvas/', include('canvas_management.urls')),
    path('communication/', include('communication.urls')),
    path('event/', include('event_management.urls')),
    path('ratings/', include('volunteer_rating.urls')),
    path("accounts/", include("django.contrib.auth.urls")),
    path('mail_serv/',include('mail_serv.urls'),),
    path('file_serv/',include('file_serv.urls'),),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('forum/',include('forum.urls'),),
] + static(settings.MEDIA_ROOT, document_root=settings.MEDIA_ROOT)
