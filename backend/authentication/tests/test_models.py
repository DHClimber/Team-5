from django.test import TestCase
from django.contrib.auth import get_user_model

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


