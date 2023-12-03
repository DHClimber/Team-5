from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.test import TestCase
from django.contrib.auth.models import User
from event_management.models import Community
from django.contrib.auth import get_user_model
from dotenv import load_dotenv
import os

#Load local environment variables
load_dotenv()
test_password = os.environ['TEST_USER_PASSWORD']

class CommunityTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        User = get_user_model()
        self.user = User.objects.create_user(username='testuser', email='test@example.com', first_name='test', last_name='user',phone_number='1234567890', is_admin=True, password=test_password)
        self.client.force_authenticate(user=self.user)
        self.community_url = reverse('community')

    # Issue with creating community and setting admin flag do to post having admin be read-only.
    # Investigating a workaround
    # def test_create_community_success(self):
    #     data = {
    #         'community_name': 'Test Community',
    #         'city': 'Test City',
    #         'state': 'FL'
        
    #     }
    #     response = self.client.post(self.community_url, data)
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        

    # def test_create_community_failure(self):
    #     data = {
    #         'community_name': '',
    #         'city': 'Test City',
    #         'state': 'FL'
    #     }
    #     response = self.client.post(self.community_url, data)
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
    # Create community in database and validate successful
    def test_get_communities(self):
        Community.objects.create(admin=self.user, community_name='Sample Community', city='Sample City', state='FL')
        response = self.client.get(self.community_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  
    

    def tearDown(self):
        #Clean up any objects created
        #self.community.delete()
        self.user.delete()
       
