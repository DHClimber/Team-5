from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

import jwt
from authentication.renderers import UserRender
from authentication.models import User

from authentication.serializers import (RegisterSerializer, LoginSerializer)

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from authentication.utils import Util

from authentication.permissions import IsOwner
from rest_framework import permissions


# Create your views here.
class RegisterView(APIView):
    serializer_class = RegisterSerializer
    renderer_classes = (UserRender, )

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user_data = serializer.data

        user = User.objects.get(email=user_data['email'])
        token = RefreshToken.for_user(user).access_token

        # current_site = get_current_site(request).domain
        # relativeLink = reverse('email-verify')
        # absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
        # email_body = 'Hi ' + user.username + \
        #     ', Use the link below to verify your email \n'+absurl
        # data = {'email_body': email_body, 'to_email': user.email, 'email_subject': 'Verify your email'}

        # Util.send_email(data)

        return Response(user_data, status=status.HTTP_201_CREATED)



class LoginAPIView(APIView):
    serializer_class = LoginSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)