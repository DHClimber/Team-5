from django.urls import path
from event_management.views import CreateCommunity

urlpatterns = [
      path('community/', CreateCommunity.as_view(), name="register"),
]