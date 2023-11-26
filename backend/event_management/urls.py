from django.urls import path
from event_management.views import CreateCommunity
from event_management.views import (EventAPIView)

urlpatterns = [
      path('community/', CreateCommunity.as_view(), name="register"),
      path('', EventAPIView.as_view(), name="event"),
]