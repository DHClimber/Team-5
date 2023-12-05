from rest_framework import serializers
from authentication.models import User
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from authentication.utils import Util
import datetime
from file_serv.models import FileSave

class uploadSerializer(serializers.Serializer):
    file = serializers.FileField(max_length=None, allow_empty_file=False, use_url=True)


class SaveUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileSave
        fields = ['file_path', 'event']
    

