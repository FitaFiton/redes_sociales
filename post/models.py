from django.db import models
from django.contrib.auth.models import User


# Create your models here. https://docs.djangoproject.com/en/3.0/topics/db/models/
class Post(models.Model):
    title = models.CharField(max_length=30, blank=True)  # Como mucho 30 caracteres y que puede estar en blanco
    content = models.TextField()  # No tiene maximo de caracteres
    author = models.ForeignKey(User, on_delete=models.CASCADE)  #Relacion 1 a N, clase escrita en en la libreria de django
    date = models.DateTimeField(auto_now_add=True)  # Trabaja con la referencia temporal de settings que esta en UTC y
                                                    # el auto_now_add guarda la fecha de creacion, no actualiza la fecha
    def __str__(self):
        #return '{{}} - {}: {}'.format(self.pk, self.title, self.content)
        return f'{ {self.pk} } - {self.title}: {self.content} - {self.author}'


class Profile(models.Model):
    music = models.BooleanField()  # Como mucho 30 caracteres y que puede estar en blanco
    literature = models.BooleanField()  # No tiene maximo de caracteres
    sport = models.BooleanField()  #Relacion 1 a N, clase escrita en en la libreria de django
    party = models.BooleanField()  # Trabaja con la referencia temporal de settings que esta en UTC y
                                                    # el auto_now_add guarda la fecha de creacion, no actualiza la fecha
    art = models.BooleanField()
    user_reference = models.ForeignKey(User, on_delete=models.CASCADE)


    def __str__(self):
        #return '{{}} - {}: {}'.format(self.pk, self.title, self.content)
        return f'{ {self.pk} } - {self.music}: {self.literature} - {self.sport} - {self.party} - {self.art} - {self.user_reference}'

