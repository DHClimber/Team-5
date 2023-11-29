from django.urls import reverse, resolve
from django.test import TestCase
from event_management.views import (
    CreateCommunity, EventAPIView
)

class TestUrls(TestCase):
    def test_register_url_resolves(self):
        url = reverse('register')
        self.assertEqual(resolve(url).func.view_class, CreateCommunity)

    def test_organizer_register_url_resolves(self):
        url = reverse('event')
        self.assertEqual(resolve(url).func.view_class, EventAPIView)