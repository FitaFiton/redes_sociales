from abc import ABC

from rest_framework.serializers import DateTimeField, HyperlinkedModelSerializer, Serializer
from post.models import Post, Profile, User, Friend, Chat, Message
#from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings


class ProfileSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Profile
        fields = ['id', 'music', 'literature', 'sport', 'party', 'art', 'image']
        # title = models.CharField(max_length=30, blank=True)
        # content = models.TextField()
        # author = models.ForeignKey(User(), on_delete=models.CASCADE)
        # date = models.DateTimeField(auto_now_add=True)

    def update(self, instance, validated_data):
        print(f'instance {instance}')
        print(f'validated_data {validated_data}')
        pass

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance


class ProfilePleasuresInfoSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Profile
        fields = ['music', 'literature', 'sport', 'party', 'art']


class UserRegistrationSerializer(HyperlinkedModelSerializer):
    profile = ProfileSerializer()

    def create(self, validated_data):
        plain_password = validated_data.pop('password')
        instance = self.Meta.model(**validated_data)
        instance.set_password(plain_password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'creation_date', 'profile', 'posts_number', 'followers']


class UserSerializer(HyperlinkedModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'creation_date', 'profile', 'followers']


class UserReference(HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']


class UserConnectSerializer(HyperlinkedModelSerializer):
    token = serializers.SerializerMethodField()

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    class Meta:
        model = User
        fields = ['token', 'id', 'username', 'password']


class PostSerializer(HyperlinkedModelSerializer):
    date = DateTimeField(format='%d-%m-%Y %H: %M: %S')
    author = UserReference()

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'date', 'author']
        # title = models.CharField(max_length=30, blank=True)
        # content = models.TextField()
        # author = models.ForeignKey(User(), on_delete=models.CASCADE)
        # date = models.DateTimeField(auto_now_add=True)

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass


class FriendSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Friend
        fields = ['id','user_id', 'friend_id']
        # title = models.CharField(max_length=30, blank=True)
        # content = models.TextField()
        # author = models.ForeignKey(User(), on_delete=models.CASCADE)
        # date = models.DateTimeField(auto_now_add=True)

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass


class ActualFriendsSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Friend
        fields = ['friend_id']
        # title = models.CharField(max_length=30, blank=True)
        # content = models.TextField()
        # author = models.ForeignKey(User(), on_delete=models.CASCADE)
        # date = models.DateTimeField(auto_now_add=True)

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass


class MessageSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Message
        fields = ['text', 'username', 'date']
        # title = models.CharField(max_length=30, blank=True)
        # content = models.TextField()
        # author = models.ForeignKey(User(), on_delete=models.CASCADE)
        # date = models.DateTimeField(auto_now_add=True)

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass


class ChatSerializer(HyperlinkedModelSerializer):
    messages = serializers.SerializerMethodField()

    def get_messages(self, obj):
        messages_list = []
        for elem in obj.get_messages():
            print("elem")
            print(elem)
            messages_list.append(MessageSerializer(elem).data)
        return messages_list

    class Meta:
        model = Chat
        fields = ['room_id', 'users', 'messages']

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass



