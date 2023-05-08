from rest_framework import serializers
from .models import Submissions, User
from djoser.serializers import UserSerializer as BaseUserSerializer, UserCreateSerializer as BaseUserCreateSerializer


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields= [ "id", "username",  "email","password", "first_name", "last_name"]

class UserSerializer(BaseUserSerializer):
  class Meta(BaseUserSerializer.Meta):
    model = User
    fields = ["id", "username", "email"]

class SubSerializer(serializers.ModelSerializer):
  user = UserSerializer()
  class Meta:
    model = Submissions
    fields = ["id", "user", "title", "summary", "description", "image", "name", "create_at", "git_link", "other_link"]
