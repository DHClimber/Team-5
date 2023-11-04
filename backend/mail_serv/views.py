from django.shortcuts import render
from django.core.mail import send_mail
from django.http import HttpResponse
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




    