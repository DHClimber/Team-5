from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.permissions import AllowAny

import jwt

from forum.serializers import ForumSerializer, ForumSerializerDelete
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from authentication.utils import Util
from rest_framework import permissions
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from authentication.models import User

class forumViewAPI(APIView):
    
    serializer_class = ForumSerializer
   
    def get(self, request,**kwargs):
        event_id = request.GET.get('event_id')
        pack = request.data
        serializer = self.serializer_class(self, data=pack)
        full_list = serializer.get_messages(pack, event_id=event_id)
        return Response(full_list, status=status.HTTP_200_OK)

        """
        try:
            cook_username = request.COOKIES['username']
            cook_email = request.COOKIES['email']
            cook_user_id = request.COOKIES['user_id']
            cook_session = request.COOKIES['user_session']
            user = User.objects.get(pk=cook_user_id)
            authenticated = user.is_authenticated
            
            if user.is_authenticated == None:
                logged_in = False

        except Exception as error:
            logged_in = False
            print("an error", error)
            pass

        if not logged_in:
            msg_error = {"message": "You must be logged in first"}
            return Response(msg_error, status=status.HTTP_401_UNAUTHORIZED)
        """

class forumAPI(APIView):
    
    serializer_class = ForumSerializer
    permission_classes = [IsAuthenticated]
   
    def post(self, request, **kwargs):
        #check for login
        nickname = request.user.username
        logged_in = True
        event_id = ''
        event_id = request.POST.get('EventId')

        """
        try:
            cook_username = request.COOKIES['username']
            cook_email = request.COOKIES['email']
            cook_user_id = request.COOKIES['user_id']
            cook_session = request.COOKIES['user_session']
            user = User.objects.get(pk=cook_user_id)
            authenticated = user.is_authenticated
            
            if user.is_authenticated == None:
                logged_in = False

        except Exception as error:
            logged_in = False
            print("an error", error)
            pass

        if not logged_in:
            msg_error = {"message": "You must be logged in first"}
            return Response(msg_error, status=status.HTTP_401_UNAUTHORIZED)
         """
        pack = request.data
        serializer = self.serializer_class(self, data=pack)
        full_list = serializer.create(pack, nickname,event_id=event_id)
        return Response(full_list, status=status.HTTP_200_OK)

class forumDeleteAPI(APIView):
    serializer_class = ForumSerializerDelete
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        pack = request.data
        serializer = self.serializer_class(self, data=pack)
        full_list = serializer.delete_message(pack.get('MessageId'))
        
        return Response(full_list, status=status.HTTP_200_OK)



     
   
    