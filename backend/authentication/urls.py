from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView)

from authentication.views import (RegisterView, LoginAPIView, 
                                  OrganizerLoginAPIView, OrganizerRegisterAPIView, 
                                  RefreshAccessToken)

urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('organizer-register/', OrganizerRegisterAPIView.as_view(), name="organizer-register"),
    path('login/', LoginAPIView.as_view(), name="login"),
    path('organizer-login/', OrganizerLoginAPIView.as_view(), name="organizer-login"),
    path('refresh/', RefreshAccessToken.as_view(), name="refresh")
]