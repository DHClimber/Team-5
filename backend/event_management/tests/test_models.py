from django.test import TestCase
from django.contrib.auth import get_user_model
from event_management.models import Community
from event_management.choices import STATE_CHOICES

User = get_user_model()

class CommunityModelTestCase(TestCase):
    def setUp(self):
        # Create a test user for the admin field
        self.user = User.objects.create_user(username='testuser', email='test@example.com', first_name='test', last_name='user',phone_number='1234567890', is_admin=False, password='testpass123')
        
        # Create a test community instance
        self.community = Community.objects.create(
            admin=self.user,
            community_name='Test Community',
            city='Test City',
            state='FL'
        )

    def test_community_creation(self):
        self.assertEqual(self.community.admin, self.user)
        self.assertEqual(self.community.community_name, 'Test Community')
        self.assertEqual(self.community.city, 'Test City')
        self.assertEqual(self.community.state, 'FL')

    def test_community_state_choices(self):
        # state_choices = dict(Community.STATE_CHOICES)
        state_choices = dict(STATE_CHOICES)
        self.assertTrue('FL' in state_choices)

    # def test_community_string_representation(self):
    #     # check for __str__ method, currently not in place
    #     self.assertEqual(str(self.community), self.community.community_name)

    

    def tearDown(self):
        # Clean up any objects created
        self.community.delete()
        self.user.delete()
