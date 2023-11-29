from django.urls import reverse, resolve
from django.test import TestCase
from authentication.views import (
    RegisterView, OrganizerRegisterAPIView, LoginAPIView,
    OrganizerLoginAPIView, RefreshAccessToken
)


class TestUrls(TestCase):
    def test_register_url_resolves(self):
        url = reverse('authentication:register')
        self.assertEqual(resolve(url).func.view_class, RegisterView)

    def test_organizer_register_url_resolves(self):
        url = reverse('authentication:organizer-register')
        self.assertEqual(resolve(url).func.view_class, OrganizerRegisterAPIView)

    def test_login_url_resolves(self):
        url = reverse('authentication:login')
        self.assertEqual(resolve(url).func.view_class, LoginAPIView)

    def test_organizer_login_url_resolves(self):
        url = reverse('authentication:organizer-login')
        self.assertEqual(resolve(url).func.view_class, OrganizerLoginAPIView)

    def test_refresh_url_resolves(self):
        url = reverse('authentication:refresh')
        self.assertEqual(resolve(url).func.view_class, RefreshAccessToken)

