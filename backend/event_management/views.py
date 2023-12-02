from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics
from event_management.models import Community, Event
from event_management.serializers import CommunitySerializer
from event_management.permissions import IsAdmin
from rest_framework.permissions import IsAuthenticated

from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from event_management.serializers import (EventSerializer)
from event_management.choices import STATE_CHOICES

# Create your views here.



class CreateCommunity(APIView):
    permission_classes = [IsAuthenticated]

    # get returns array of all communities
    def get(self, request):
        communities = Community.objects.all()
        serializer = CommunitySerializer(communities, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request):
        serializer = CommunitySerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 

class CreateEvent(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        community_id = request.query_params.get('community_id')
        if community_id is None:
            return Response('No community id provided', status=status.HTTP_400_BAD_REQUEST)
        
        try:
            community = Community.objects.get(id=community_id)
        except Community.DoesNotExist:
            return Response('Community does not exist', status=status.HTTP_400_BAD_REQUEST)

        queryset = Event.objects.filter(community=community)
        serializer = EventSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        print(request.data)
        serializer = EventSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
class StateDropDownList(APIView):
    def get(self, request):
        states = STATE_CHOICES
        data = {
            'states': states
        }

        return Response(data=data, status=status.HTTP_200_OK)

#Change anything needed, this is only for testing file upload DH
# class EventAPIView(APIView):
#     serializer_class = EventSerializer

#     def post(self, request):
#         user = request.data
#         serializer = self.serializer_class(data=user)
#         serializer.is_valid(raise_exception=True)

#         return Response(serializer.data, status=status.HTTP_200_OK)
