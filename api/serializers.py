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
  date = serializers.SerializerMethodField(method_name='get_date_timestamp')
  class Meta:
    model = Submissions
    fields = ["id",'user', 'hackathon_listing', 'title', "summary", "description", "image", "create_at","date", "git_link", "other_link","isFav" ]
  
  def get_date_timestamp(self, instance):
      d= instance.create_at.timestamp()
      return d *1000
    
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


class HackathonListingSerializer(serializers.ModelSerializer):
  # creater = UserSerializer()
  submissions = SubSerializer(many=True,read_only=True)
  creater = UserSerializer(read_only=True)
  startDate = serializers.SerializerMethodField(method_name='get_startDate_timestamp')
  endDate = serializers.SerializerMethodField(method_name='get_endDate_timestamp')
  class Meta:
    model = HackathonListing
    fields = [ "id", 'creater',"title", "summary","description","image","create_at","start_date","end_date","startDate", "endDate","reward","submissions"]

  def get_startDate_timestamp(self, instance):
      d= instance.start_date.timestamp()
      return d *1000
  def get_endDate_timestamp(self, instance):
      d= instance.end_date.timestamp()
      return d *1000
  

class SubmissionDetailSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  endDate = serializers.SerializerMethodField(method_name='get_endDate_timestamp')
  startDate = serializers.SerializerMethodField(method_name="get_startDate_timestamp")
  name = serializers.SerializerMethodField(method_name="get_name")
  createDate = serializers.SerializerMethodField(method_name='get_create_at')

  class Meta:
    model = Submissions
    fields = ["id", 'user',"title", "summary","description", "image", 'createDate', 'git_link', "other_link","isFav",'hackathon_listing', "endDate", "startDate", 'name']

  def get_endDate_timestamp(self, instance):
    return instance.hackathon_listing.end_date.timestamp()*1000
  def get_startDate_timestamp(self, instance):
    return instance.hackathon_listing.start_date.timestamp()*1000
  def get_name(self, instance):
    return instance.hackathon_listing.title
  def get_create_at(self, instance):
    return instance.create_at.timestamp()*1000




























class SubDetailSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  post = FavSerializer(many=True, read_only=False)
  class Meta:
    model = Submissions
    fields = ["id", 'user',"title", "summary","description", "image", 'name', 'create_at', 'git_link', "other_link","post"]
