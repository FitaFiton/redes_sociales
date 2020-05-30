from channels.generic.websocket import AsyncWebsocketConsumer
import json
from datetime import datetime

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        user = await self.scope['user_task']
        self.scope['user'] = user

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        if user.is_anonymous:
            await self.close()
        else:
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.accept()

    async def receive(self, text_data=None, bytes_data=None):
        print(f'Recibido: {text_data}')
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'message',
                'message': text_data,
                'username': self.scope['user'].username
            }
        )

    async def message(self, event):
        print(event)
        await self.send(text_data=json.dumps({
            'text': event['message'],
            'username': event['username'],
            'date': datetime.now().strftime("%m/%d, %H:%M:%S")
        }))

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    #async def send(self, text_data=None, bytes_data=None, close=False):
    #    pass
