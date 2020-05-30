from django.contrib import admin
from post.models import Post, User
from django.contrib.auth.admin import UserAdmin

# Register your models here.
admin.site.register(Post)
admin.site.register(User, UserAdmin)
