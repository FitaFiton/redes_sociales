from django.db import models
#from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django_redes_sociales import settings


class Profile(models.Model):
    id = models.AutoField(primary_key=True)
    music = models.BooleanField(default=False)  # Como mucho 30 caracteres y que puede estar en blanco
    literature = models.BooleanField(default=False)  # No tiene maximo de caracteres
    sport = models.BooleanField(default=False)  #Relacion 1 a N, clase escrita en en la libreria de django
    party = models.BooleanField(default=False)  # Trabaja con la referencia temporal de settings que esta en UTC y
                                                    # el auto_now_add guarda la fecha de creacion, no actualiza la fecha
    art = models.BooleanField(default=False)
    image = models.ImageField(upload_to='static', default='/static/descarga.png')


    def __str__(self):
        #return '{{}} - {}: {}'.format(self.pk, self.title, self.content)
        return f'{ {self.pk} } - {self.music} - {self.literature} - {self.sport} - {self.party} - {self.art} - {self.image}'


class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=80, null=False)
    email = models.EmailField(unique=True, blank=True)
    first_name = models.CharField(max_length=80, null=True)
    last_name = models.CharField(max_length=80, null=True)
    creation_date = models.DateTimeField(auto_now_add=True)
    profile = models.OneToOneField(Profile, unique=True, on_delete=models.CASCADE, null=True, )

    class Meta:
        db_table = 'auth_user'

    def __str__(self):
        #return '{{}} - {}: {}'.format(self.pk, self.title, self.content)
        return f'{ {self.id} } - {self.username}: {self.password} - {self.email} - {self.first_name} - {self.last_name} - {self.creation_date} - {self.profile}'


# Create your models here. https://docs.djangoproject.com/en/3.0/topics/db/models/
class Post(models.Model):
    title = models.CharField(max_length=30, blank=True)  # Como mucho 30 caracteres y que puede estar en blanco
    content = models.TextField()  # No tiene maximo de caracteres
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  #Relacion 1 a N, clase escrita en en la libreria de django
    date = models.DateTimeField(auto_now_add=True)  # Trabaja con la referencia temporal de settings que esta en UTC y
                                                    # el auto_now_add guarda la fecha de creacion, no actualiza la fecha
    def __str__(self):
        #return '{{}} - {}: {}'.format(self.pk, self.title, self.content)
        return f'{ {self.pk} } - {self.title}: {self.content} - {self.author}'



