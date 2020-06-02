from django.http import HttpResponse
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from post.serializers import PostSerializer, UserSerializer, UserRegistrationSerializer, ProfileSerializer, FriendSerializer, ActualFriendsSerializer, ChatSerializer, MessageSerializer
from post.models import Post, Profile, User, Friend, Chat, Message
import json

#from django.contrib.auth.models import User
#from django.contrib.auth import get_user_model
#User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    #Post.objects.filter(title='hola')

    def get_queryset(self):
        mode_user = self.request.query_params.get('filterByUser', None)

        mode_followers = self.request.query_params.get('filterByMostFollowers', None)
        mode_posts = self.request.query_params.get('filterByByMostPosts', None)
        if mode_user:
            print(User.objects.filter(username=self.request.user))

            return User.objects.filter(username=self.request.user)
        elif mode_followers:
            return User.objects.all().order_by('-followers')[0:3]
        elif mode_posts:
            return User.objects.all().order_by('-posts_number')[0:3]
        else:
            return User.objects.all()

    def get_serializer_class(self, *args, **kwargs):
        return UserRegistrationSerializer

    def get_profile_serializer_class(self, *args, **kwargs):
        return ProfileSerializer

    def retrieve(self, request, *args, **kwargs):
        url = request.build_absolute_uri()
        if url.endswith('/'):
            url = url[:-1]

        user_id = url.split('/')[-1]
        user = UserSerializer(User.objects.get(id=user_id))

        return Response(user.data)

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
        if 'posts_number' in request.data:
            if request.data['posts_number'] == 1:
                user.posts_number = user.posts_number + 1
            elif request.data['posts_number'] == -1:
                user.posts_number = user.posts_number - 1
            user.save()
        elif 'followers' in request.data:
            if request.data['followers'] == 1:
                user.followers = user.followers + 1
            elif request.data['followers'] == -1:
                user.followers = user.followers - 1
            user.save()
        elif 'music' in request.data:
            profile = Profile.objects.get(id=user.profile.id)

            profile.music = request.data['music']
            profile.literature = request.data['literature']
            profile.sport = request.data['sport']
            profile.party = request.data['party']
            profile.art = request.data['art']
            print(request.data['image'])
            profile.image = request.data['image']

            profile.save()
        if user:
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
    permission_classes = (AllowAny,)
    #Post.objects.filter(title='hola')

    def get_queryset(self):
        mode_posts_actual_user = self.request.query_params.get('filterByUser', None)
        mode_posts_profile_user = self.request.query_params.get('filterByProfile', None)

        if mode_posts_actual_user:
            return Post.objects.filter(author=self.request.user)
        elif mode_posts_profile_user:
            url = self.request.build_absolute_uri()
            url_arguments = url.split("=")
            return Post.objects.filter(author=url_arguments[1])
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


class FriendViewSet(ModelViewSet):
    #queryset = Post.objects.all()
    permission_classes = (AllowAny,)
    #Post.objects.filter(title='hola')

    def get_queryset(self):
        mode_friend_actual_user = self.request.query_params.get('filterByUser', None)
        mode_friend = self.request.query_params.get('filterByFriend', None)
        mode_followers_actual_user = self.request.query_params.get('filterByFollowers', None)
        print(self.request.user)
        #print(mode_posts_profile_user)
        if mode_friend_actual_user:
            url = self.request.build_absolute_uri()
            url_arguments = url.split("=")
            #return Friend.objects.raw('SELECT friend_id FROM post_friend WHERE user_id=3')
            return Friend.objects.filter(user_id=url_arguments[1])
        elif mode_followers_actual_user:
            url = self.request.build_absolute_uri()
            url_arguments = url.split("=")
            #return Friend.objects.raw('SELECT friend_id FROM post_friend WHERE user_id=3')
            return Friend.objects.filter(friend_id=url_arguments[1])
        elif mode_friend:
            url = self.request.build_absolute_uri()
            url_arguments = url.split("=")
            print("ESTAMOS FILTRANDO COMO AMIGOS")
            print(self.request.user.id)
            print("EL OTRO PRINT")
            print(url_arguments[1])
            return Friend.objects.filter(friend_id=url_arguments[1], user_id=self.request.user.id)
        else:
            return Friend.objects.all()

    def get_serializer_class(self, *args, **kwargs):
        return FriendSerializer

    #def list(self, request, *args, **kwargs):
        #print(request.headers)
        #return super().list(request, args, kwargs)

    def create(self, request, *args, **kwargs):
        p = Friend.objects.create(
            user_id=request.data['user_id'],
            friend_id=request.data['friend_id'],
        )
        serialized_data = self.get_serializer(p).data
        return Response(serialized_data, status=status.HTTP_201_CREATED)#201 para crear correctamente un nuevo post

    def destroy(self, request, *args, **kwargs):
        url = request.build_absolute_uri()
        if url.endswith('/'):
            url = url[:-1]

        friend_id = url.split('/')[-1]

        try:
            f = Friend.objects.get(id=friend_id)
            if request.user.id == f.user_id:
                f.delete()
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except Friend.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class MessageViewSet(ModelViewSet):
    #queryset = Post.objects.all()
    permission_classes = (AllowAny,)
    #Post.objects.filter(title='hola')

    def get_queryset(self):
        return Message.objects.all()

    def get_serializer_class(self, *args, **kwargs):
        return MessageSerializer

    #def list(self, request, *args, **kwargs):
        #print(request.headers)
        #return super().list(request, args, kwargs)

    def create(self, request, *args, **kwargs):
        p = Message.objects.create(
            text=request.data['text'],
            username=request.data['username'],
            date=request.data['date']
        )
        serialized_data = self.get_serializer(p).data
        return Response(serialized_data, status=status.HTTP_201_CREATED)#201 para crear correctamente un nuevo post

    def destroy(self, request, *args, **kwargs):
        pass

class ChatViewSet(ModelViewSet):
    #queryset = Post.objects.all()
    permission_classes = (AllowAny,)
    #Post.objects.filter(title='hola')

    def get_queryset(self):
        mode_chat_users = self.request.query_params.get('filterByUsers', None)
        mode_filter_by_count = self.request.query_params.get('filterByCount', None)
        mode_filter_by_room = self.request.query_params.get('filterByRoom', None)
        if mode_chat_users:
            url = self.request.build_absolute_uri()
            url_arguments = url.split("=")
            print("users_chat")
            queryset = Chat.objects.all()

            for elem in queryset:
                users = elem.users
                print(users.find(self.request.user.username))
                if users.find(self.request.user.username)!=-1 and users.find(url_arguments[1])!=-1:
                    return Chat.objects.filter(users=users)
            return []
        elif mode_filter_by_count:
            return Chat.objects.all().order_by('room_id')
        if mode_filter_by_room:
            url = self.request.build_absolute_uri()
            url_arguments = url.split("=")
            return Chat.objects.filter(room_id=url_arguments[1])
        else:
            return Chat.objects.all()

    def get_serializer_class(self, *args, **kwargs):
        return ChatSerializer

    #def list(self, request, *args, **kwargs):
        #print(request.headers)
        #return super().list(request, args, kwargs)

    def create(self, request, *args, **kwargs):
        p = Chat.objects.create(
            users='['+request.data['username'] + ',' + request.data['friend_username'] + ']',
        )
        serialized_data = self.get_serializer(p).data
        return Response(serialized_data, status=status.HTTP_201_CREATED)#201 para crear correctamente un nuevo post

    def destroy(self, request, *args, **kwargs):
        url = request.build_absolute_uri()
        if url.endswith('/'):
            url = url[:-1]

        room_id = url.split('/')[-1]

        try:
            f = Chat.objects.get(room_id=room_id)
            f = json.loads(f)
            if request.user.id in f['users']:
                f.delete()
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except Chat.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None, project_pk=None):
        url = request.build_absolute_uri()
        if url.endswith('/'):
            url = url[:-1]

        room_id = url.split('/')[-1]
        chat = Chat.objects.get(room_id=room_id)
        message = None
        if 'text' in request.data:
            message = Message.objects.create(text=request.data['text'],
                                             username=request.data['username'],
                                             date=request.data['date'],
                                             chat=chat)

            print(message)

        if message is not None:
            return Response("Ok se ha actualizado correctamente", status=status.HTTP_201_CREATED)
        return Response("No se ha podido actualizar su perfil", status=status.HTTP_400_BAD_REQUEST)