from django.shortcuts import render
from django.core.mail import send_mail
from django.http import HttpResponse
from django.shortcuts import redirect
import requests
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from mail_serv.serializers import passReset

# Create your views here.
## This is only temporary so that we can repurpose if we want to send email notifications other than password
## reset

#For password reset API
class passwordResetAPI(APIView):
    serializer_class = passReset
  
    def post(self, request):
        #redirects with internal post request to django-rest-auth password reset endpoint
        user_email = request.data["email"]
        redirect_url = request.build_absolute_uri('/dj-rest-auth/password/reset/')
        payload = requests.post(f'{redirect_url}', data = {'email':f'{user_email}'})
        message = json.dumps(f"Sent password reset to: {user_email}")
        response = HttpResponse(message)
        return response

def mail_serv(request):
    #testing end point http://127.0.0.1:8000/mail_serv/
    #get request body key value pair format {"email":"user email address"}

    payload = json.loads(request.body.decode('utf-8'))

    to_mail= payload["email"]
    subject = payload["subject"]
    message = payload["message"]
    from_mail = "uflcommunitycanvas@gmail.com"
    error_message = "fail_silently=False"
  
    send_mail(subject,message,from_mail,[to_mail],error_message)
    response = HttpResponse(f"Sent message to {to_mail}:\n\n{message}")

    return response 

@csrf_exempt
def reset(request):
    #testing end point http://127.0.0.1:8000/mail_serv/
    #get request body key value pair format {"email":"user email address"}

    payload = json.loads(request.body.decode('utf-8'))

    to_mail= payload["email"]
    subject = payload["subject"]
    message = payload["message"]
    from_mail = "uflcommunitycanvas@gmail.com"
    error_message = "fail_silently=False"
  
    send_mail(subject,message,from_mail,[to_mail],error_message)
    response = HttpResponse(f"Sent message to {to_mail}:\n\n{message}")

    return response 


    