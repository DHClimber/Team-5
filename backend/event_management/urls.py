from django.urls import path
from event_management.views import (EventAPIView)

urlpatterns = [
    path('', EventAPIView.as_view(), name="event"),
]