from rest_framework import serializers
from event_management.models import Community
from authentication.models import User
from authentication.serializers import RegisterSerializer


class CommunitySerializer(serializers.ModelSerializer):
    #admin = RegisterSerializer(read_only=True)
    admin = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), default=serializers.CurrentUserDefault()
    )

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
    
