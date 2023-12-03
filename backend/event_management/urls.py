from django.urls import path
from event_management.views import CreateCommunity, CreateEvent, StateDropDownList
# from event_management.views import (EventAPIView)

urlpatterns = [
      path('community/', CreateCommunity.as_view(), name="community"),
      path('community/events/', CreateEvent.as_view(), name="event"),
      path('community/events/states/', StateDropDownList.as_view(), name="states"),
      # path('', EventAPIView.as_view(), name="event"),
]