from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from dotenv import load_dotenv
import os

User = get_user_model()

#Load local environment variables
load_dotenv()
test_password = os.environ['TEST_USER_PASSWORD']
class UserCreationTests(TestCase):
    def test_create_user_with_valid_details(self):
        
        user = User.objects.create_user(username='testuser', email='test@example.com', first_name='test', last_name='user',phone_number='1234567890', is_admin=False, password=test_password)
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.first_name, 'test')
        self.assertEqual(user.last_name, 'user')
        self.assertEqual(user.phone_number, '1234567890')
        self.assertTrue(user.check_password(test_password))

    def test_create_user_without_username(self):
        with self.assertRaises(TypeError):
            User.objects.create_user(username=None, email='test@example.com', first_name='test', last_name='user',phone_number='1234567890', is_admin=False, password=test_password)

    def test_create_user_without_email(self):
        with self.assertRaises(TypeError):
            User.objects.create_user(username='testuser', email=None, first_name='test', last_name='user',phone_number='1234567890', is_admin=False, password=test_password)

    def test_create_duplicate_username(self):
        User.objects.create_user(username='testuser', email='test1@example.com', first_name='test', last_name='user',phone_number='1234567890', is_admin=False, password=test_password)
        with self.assertRaises(IntegrityError):  
            User.objects.create_user(username='testuser', email='test2@example.com', first_name='test', last_name='user',phone_number='1234567890', is_admin=False, password=test_password)

class UserTokenGenerationTest(TestCase):
    def test_token_generation_on_new_user(self):
        user = User.objects.create_user(username='testuser', email='test@example.com', first_name='test', last_name='user',phone_number='1234567890', is_admin=False, password=test_password)
        
        user_tokens = user.tokens()

        self.assertIsNotNone(user_tokens.get('refresh'))
        self.assertIsNotNone(user_tokens.get('access'))

        refresh = RefreshToken(user_tokens['refresh'])
        self.assertEqual(refresh['user_id'], user.id)

        access = refresh.access_token
        self.assertEqual(access['user_id'], user.id)