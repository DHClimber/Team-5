from django.urls import reverse, resolve
from django.test import TestCase
from event_management.views import (
    CreateCommunity
)

class TestUrls(TestCase):
    def test_register_url_resolves(self):
        url = reverse('register')
        self.assertEqual(resolve(url).func.view_class, CreateCommunity)
