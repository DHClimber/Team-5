from django.shortcuts import render
from django.core.mail import send_mail
from django.http import HttpResponse
from django.shortcuts import redirect
import requests
import json

# Create your views here.
## This is only temporary so that we can repurpose if we want to send email notifications other than password
## reset

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

def redirect_view(request):
    #redirects with internal post request to django-rest-auth password reset endpoint
    package = json.loads(request.body.decode('utf-8'))
    user_email = package["email"]

    redirect_url = request.build_absolute_uri('/dj-rest-auth/password/reset/')
    payload = requests.post(f'{redirect_url}', data = {'email':f'{user_email}'})
    data = json.dumps(f"Sent password reset to: {user_email}")
    response = HttpResponse(data)
    return response



    