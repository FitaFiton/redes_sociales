from django.http import HttpResponse
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from post.serializers import PostSerializer, UserSerializer, UserRegistrationSerializer, ProfileSerializer
from post.models import Post, Profile, User
#from django.contrib.auth.models import User
#from django.contrib.auth import get_user_model
#User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    #Post.objects.filter(title='hola')

    def get_queryset(self):
        print(self.request.query_params.get('filterByUser', None))
        mode = self.request.query_params.get('filterByUser', None)
        if mode:
            print(self.request.user)
            print(User.objects.filter(username=self.request.user))

            return User.objects.filter(username=self.request.user)
        else:
            return User.objects.all()

    def get_serializer_class(self, *args, **kwargs):
        return UserRegistrationSerializer

    def get_profile_serializer_class(self, *args, **kwargs):
        return ProfileSerializer

    def retrieve(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        request.data['profile'] = Profile.objects.create(music=False, literature=False, sport=False, party=False, art=False)

        user = User.objects.create_user(username=request.data['username'],
                                        password=request.data['password'],
                                        email=request.data['email'],
                                        first_name=request.data['first_name'],
                                        last_name=request.data['last_name'],
                                        profile=request.data['profile'])

        serializer = self.get_serializer(user).data
        if serializer:
            return Response(serializer, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        url = request.build_absolute_uri()
        if url.endswith('/'):
            url = url[:-1]

        post_id = url.split('/')[-1]
        a = Post.objects.get(id=post_id).delete()
        return HttpResponse()

    def update(self, request, pk=None, project_pk=None):
        url = request.build_absolute_uri()
        if url.endswith('/'):
            url = url[:-1]

        user_id = url.split('/')[-1]
        user = User.objects.get(id=user_id)
        profile = Profile.objects.get(id=user.profile.id)

        profile.music = request.data['music']
        profile.literature = request.data['literature']
        profile.sport = request.data['sport']
        profile.party = request.data['party']
        profile.art = request.data['art']
        profile.image = request.data['image']

        profile.save()
        if profile:
            return Response("Ok se ha actualizado correctamente", status=status.HTTP_201_CREATED)
        return Response("No se ha podido actualizar su perfil", status=status.HTTP_400_BAD_REQUEST)


class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    permission_classes = (AllowAny,)
    #Post.objects.filter(title='hola')

    def get_serializer_class(self, *args, **kwargs):
        return ProfileSerializer

    def create(self, request, *args, **kwargs):
        print(request.FILES)
        print(request.data['image'])
        print(type(request.data['image']))
        p = Profile.objects.create(
            music=request.data['music'][0],
            literature=request.data['literature'][0],
            sport=request.data['sport'][0],
            party=request.data['party'][0],
            art=request.data['art'][0],
            #image=request.data['image'],
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

