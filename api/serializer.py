from rest_framework import serializers
from .models import Submissions, User, FavPosts
from djoser.serializers import UserSerializer as BaseUserSerializer, UserCreateSerializer as BaseUserCreateSerializer


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields= [ "id", "username",  "email","password", "first_name", "last_name"]

class UserSerializer(BaseUserSerializer):
  class Meta(BaseUserSerializer.Meta):
    model = User
    fields = ["id", "username", "email"]



class SubSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = Submissions
    fields = ["id",'user', "title", "summary", "description", "image", "name", "create_at", "git_link", "other_link" ]
    
class SubmissionDetailSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  class Meta:
    model = Submissions
    fields = ["id", 'user',"title", "summary","description", "image", 'name', 'create_at', 'git_link', "other_link"]

class FavSerializer(serializers.ModelSerializer):
  class Meta:
    model = FavPosts
    fields = ["id", "submission", "user_liked"]

class SubDetailSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  post = FavSerializer(many=True, read_only=False)
  class Meta:
    model = Submissions
    fields = ["id", 'user',"title", "summary","description", "image", 'name', 'create_at', 'git_link', "other_link","post"]
