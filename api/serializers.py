from rest_framework import serializers
from .models import Submissions, User, FavPosts, HackathonListing
from djoser.serializers import UserSerializer as BaseUserSerializer, UserCreateSerializer as BaseUserCreateSerializer

import datetime
class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
      fields= [ "id", "username",  "email","password", "isCreater"]

class UserSerializer(BaseUserSerializer):
  class Meta(BaseUserSerializer.Meta):
    model = User
    fields = ["id", "username", "email", "isCreater"]




class SubSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = Submissions
    fields = ["id",'user', 'hackathon_listing', 'name', "summary", "description", "image", "create_at", "git_link", "other_link","isFav" ]
    
class HackathonPostSerializer(serializers.ModelSerializer):
  date = serializers.SerializerMethodField(method_name='get_date_timestamp')
  class Meta:
    model = HackathonListing
    fields = [ "id", 'creater',"title", "summary","description","image","create_at", "start_date", "end_date","reward","date"]

  def get_date_timestamp(self, instance):
      d= instance.create_at.timestamp()
      return d *1000
    
class FavSerializer(serializers.ModelSerializer):
  class Meta:
    model = FavPosts
    fields = ["id",'hackathon_id', "submission_id"]



class SubmissionDetailSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  # post= FavSerializer(many=True, read_only=False)
  class Meta:
    model = Submissions
    fields = ["id", 'user','hackathon_listing',"name", "summary","description", "image", 'create_at', 'git_link', "other_link","isFav"]

class HackathonListingSerializer(serializers.ModelSerializer):
  # creater = UserSerializer()
  submissions = SubSerializer(many=True,read_only=True)
  creater = UserSerializer(read_only=True)
  
  # listing= FavSerializer(many=True, read_only=False)
  class Meta:
    model = HackathonListing
    fields = [ "id", 'creater',"title", "summary","description","image","create_at", "start_date", "end_date","reward","submissions"]

  
# not required now
class SubDetailSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  post = FavSerializer(many=True, read_only=False)
  class Meta:
    model = Submissions
    fields = ["id", 'user',"title", "summary","description", "image", 'name', 'create_at', 'git_link', "other_link","post"]
