from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path

from chat.consumers import ChatConsumer
from django_redes_sociales.utils import my_auth_middleware_stack

application = ProtocolTypeRouter({
    'websocket': my_auth_middleware_stack(
        URLRouter([
            re_path(r'ws/chat/(?P<room_name>\w+)/$', ChatConsumer)
        ])
    ),
})