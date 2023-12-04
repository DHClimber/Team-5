from rest_framework import serializers
from forum.models import Forum
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from authentication.utils import Util
import datetime

class ForumSerializer(serializers.ModelSerializer):
    EventId = serializers.CharField(max_length = 200)
    Message = serializers.CharField(max_length = 500)

    class Meta:
        model = Forum
        fields = ['EventId', 'TimeStamp', 'Message']
    
    def get_max(self, all_objects):
        max_id = 0
        for item in all_objects:
            if item["PostId"] > max_id:
                max_id = item["PostId"]
        return max_id

    def create(self, validated_data,username, event_id):
        clean_data = {}
        if validated_data.get('EventId'):
            clean_data['EventId'] = validated_data.get('EventId')
        else:
            clean_data['EventId']=''
        clean_data['UserName'] = username
        if validated_data.get('Message'):
            clean_data['Message'] = validated_data.get('Message')
        else:
            clean_data['Message']=''
        clean_data['PostId'] = 0

        all_data = Forum.objects.all().values()
        next_id = self.get_max(all_data) + 1
        clean_data['PostId'] = next_id
        
        #get list of all messages after posting
        if event_id != None:
            all_data = Forum.objects.all().values().filter(EventId = event_id)
        else:
             all_data = Forum.objects.all().values()

        Forum.objects.create(**clean_data)

        return all_data 

    def get_messages(self, validated_data, **kwargs):
        event_id = kwargs.get('event_id')
        #get list for display without creating new
        if event_id != None:
            all_data = Forum.objects.all().values().filter(EventId = event_id)
        else:
             all_data = Forum.objects.all().values()
        return all_data 

class ForumSerializerDelete(serializers.ModelSerializer):
    MessageId = serializers.CharField(max_length = 500)

    class Meta:
        model = Forum
        fields = ['MessageId']

        #This is only for clearing all messages when testing
    def delete_message(self, message_id):
        print(f"message ID to delete: {message_id}")
        #if message_id = all delete all
        messages_deleted = {"message": "match not found"}
        if message_id == 'all':
            Forum.objects.all().delete()
            messages_deleted["message"] = f"all messages deleted"
            return messages_deleted
        elif message_id != '':
            #delete only a specific message
            if Forum.objects.all().filter(id = message_id):
                Forum.objects.all().filter(id = message_id).delete()
                messages_deleted["message"] = f"message id {message_id} deleted"
        return messages_deleted


