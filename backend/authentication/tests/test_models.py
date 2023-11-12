from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError


User = get_user_model()

class UserCreationTests(TestCase):
    def test_create_user_with_valid_details(self):
        user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.username, 'testuser')
        self.assertTrue(user.check_password('testpass123'))

    def test_create_user_without_username(self):
        with self.assertRaises(TypeError):
            User.objects.create_user(username=None, email='test@example.com', password='testpass123')

    def test_create_user_without_email(self):
        with self.assertRaises(TypeError):
            User.objects.create_user(username='testuser', email=None, password='testpass123')

    def test_create_duplicate_username(self):
        User.objects.create_user(username='testuser', email='test1@example.com', password='testpass123')
        with self.assertRaises(IntegrityError):  
            User.objects.create_user(username='testuser', email='test2@example.com', password='testpass123')

class UserTokenGenerationTest(TestCase):
    def test_token_generation_on_new_user(self):
        user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')
        
        user_tokens = user.tokens()

        self.assertIsNotNone(user_tokens.get('refresh'))
        self.assertIsNotNone(user_tokens.get('access'))

        refresh = RefreshToken(user_tokens['refresh'])
        self.assertEqual(refresh['user_id'], user.id)

        access = refresh.access_token
        self.assertEqual(access['user_id'], user.id)