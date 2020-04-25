from django.http import HttpResponse
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from post.serializers import PostSerializer, UserSerializer, UserRegistrationSerializer, ProfileSerializer
from post.models import Post, Profile
from django.contrib.auth.models import User


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    #Post.objects.filter(title='hola')

    def get_serializer_class(self, *args, **kwargs):
        return UserRegistrationSerializer

    def retrieve(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        url = request.build_absolute_uri()
        if url.endswith('/'):
            url = url[:-1]

        post_id = url.split('/')[-1]
        a = Post.objects.get(id=post_id).delete()
        return HttpResponse()


class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    permission_classes = (AllowAny,)
    #Post.objects.filter(title='hola')

    def get_serializer_class(self, *args, **kwargs):
        return ProfileSerializer

    def create(self, request, *args, **kwargs):
        p = Profile.objects.create(
            music=request.data['music'],
            literature=request.data['literature'],
            sport=request.data['sport'],
            party=request.data['party'],
            art=request.data['art'],
            user_reference=request.user  #User.objects.first()
        )
        serialized_data = self.get_serializer(p).data
        return Response(serialized_data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        url = request.build_absolute_uri()
        if url.endswith('/'):
            url = url[:-1]

        profile_id = url.split('/')[-1]
        try:
            p = Profile.objects.get(id=profile_id)
            if request.user == p.user_reference:
                p.delete()
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except Profile.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class PostViewSet(ModelViewSet):
    #queryset = Post.objects.all()
    #permission_classes = (AllowAny,)
    #Post.objects.filter(title='hola')

    def get_queryset(self):
        print(self.request.query_params.get('filterByUser', None))
        mode = self.request.query_params.get('filterByUser', None)
        if mode:
            return Post.objects.filter(author=self.request.user)
        else:
            return Post.objects.all()

    def get_serializer_class(self, *args, **kwargs):
        return PostSerializer

    #def list(self, request, *args, **kwargs):
        #print(request.headers)
        #return super().list(request, args, kwargs)

    def create(self, request, *args, **kwargs):
        p = Post.objects.create(
            title=request.data['title'],
            content=request.data['content'],
            author=request.user  #User.objects.first()
        )
        serialized_data = self.get_serializer(p).data
        return Response(serialized_data, status=status.HTTP_201_CREATED)#201 para crear correctamente un nuevo post

    def destroy(self, request, *args, **kwargs):
        url = request.build_absolute_uri()
        if url.endswith('/'):
            url = url[:-1]

        post_id = url.split('/')[-1]

        try:
            p = Post.objects.get(id=post_id)
            if request.user == p.author:
                p.delete()
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

