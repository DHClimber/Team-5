from django.urls import path
from event_management.views import CreateCommunity, CreateEvent
# from event_management.views import (EventAPIView)

urlpatterns = [
      path('community/', CreateCommunity.as_view(), name="community"),
      path('community/events/', CreateEvent.as_view(), name="event"),
      # path('', EventAPIView.as_view(), name="event"),
]