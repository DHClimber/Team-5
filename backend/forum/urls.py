from django.urls import path
from forum.views import forumAPI, forumDeleteAPI, forumViewAPI
from . import views

urlpatterns = [
    path('event/post/', forumAPI.as_view(), name="post event messages"),
    path('event/', forumViewAPI.as_view(), name="view event messages"),
    path('event/<str:event_id>/', forumAPI.as_view(), name="event_id"),
    path('delete/', forumDeleteAPI.as_view(), name="event messages"),
    
]
