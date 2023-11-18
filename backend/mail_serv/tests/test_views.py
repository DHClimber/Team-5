from django.test import TestCase, RequestFactory
from mail_serv.views import mail_serv

class MailServTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.request = self.factory.post('/mail_serv/', 
                                         {'email': 'test@example.com', 
                                          'subject': 'Test Subject', 
                                          'message': 'This is a test message.'}, 
                                         content_type='application/json')

    def test_email_response_valid(self):
        response = mail_serv(self.request)
        self.assertIn('Sent message to test@example.com', response.content.decode())
