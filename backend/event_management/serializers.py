from rest_framework import serializers
from event_management.models import Community
from authentication.models import User
from authentication.serializers import RegisterSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'phone_number']

class CommunitySerializer(serializers.ModelSerializer):
    # admin = serializers.PrimaryKeyRelatedField(
    #     queryset=User.objects.all(), default=serializers.CurrentUserDefault()
    # )
    admin = UserSerializer(read_only=True)

    class Meta:
        model = Community
        fields = ['id', 'admin', 'community_name', 'city', 'state']

    def create(self, validated_data):
        # here we are just using any user right now
        # we are not verifying they are an admin yet
        # but still storing it as if they were until we can
        # get the permissions working
        admin = validated_data['admin']
        community_name = validated_data['community_name']
        city = validated_data['city']
        state = validated_data['state']
        community = Community.objects.create(
            admin=admin,
            community_name=community_name,
            city=city,
            state=state
        )
        return community
    

from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from authentication.utils import Util


class EventSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)
    username = serializers.CharField(
        max_length=255, min_length=3, read_only=True)
    tokens = serializers.CharField(max_length=68, min_length=6, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'username', 'tokens']

    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password', '')

        user = auth.authenticate(email=email, password=password)

        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
        if user.is_admin:
            raise AuthenticationFailed('Unauthorized, user is registered as an organizer. Please use correct login portal')
        # if not user.is_active:
        #     raise AuthenticationFailed('Account disabled, contact admin')
        # if not user.is_verified:
        #     raise AuthenticationFailed('Email is not verified')

        return {
            'email': user.email,
            'username': user.username,
            'tokens': user.tokens,
        }
   
