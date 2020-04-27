from abc import ABC

from rest_framework.serializers import DateTimeField, HyperlinkedModelSerializer, Serializer
from post.models import Post, Profile
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings


class UserRegistrationSerializer(HyperlinkedModelSerializer):
    token = serializers.SerializerMethodField()

    def create(self, validated_data):
        plain_password = validated_data.pop('password')
        instance = self.Meta.model(**validated_data)
        instance.set_password(plain_password)
        instance.save()
        return instance

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    class Meta:
        model = User
        fields = ['token', 'username', 'password', 'email', 'first_name', 'last_name']


class UserSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class PostSerializer(HyperlinkedModelSerializer):
    date = DateTimeField(format='%d-%m-%Y %H: %M: %S')
    author = UserSerializer()

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


class ProfileSerializer(HyperlinkedModelSerializer):
    user_reference = UserSerializer()

    class Meta:
        model = Profile
        fields = ['user_reference', 'id', 'music', 'literature', 'sport', 'party', 'art']
        # title = models.CharField(max_length=30, blank=True)
        # content = models.TextField()
        # author = models.ForeignKey(User(), on_delete=models.CASCADE)
        # date = models.DateTimeField(auto_now_add=True)

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass


