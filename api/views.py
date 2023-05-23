from django.shortcuts import render
from .models import Submissions, FavPosts, HackathonListing
from .serializers import SubSerializer, SubmissionDetailSerializer,  FavSerializer, SubDetailSerializer, HackathonListingSerializer, HackathonPostSerializer
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser

from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)

    # Add custom claims'
    token['admin'] = user.isCreater
    token['username'] = user.username
   
    # ...

    return token

class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer

@api_view(["GET"])
def submissions(request):
  data = Submissions.objects.select_related('user').all()
  serial = SubSerializer(data, many = True)
  return Response(serial.data, status=200)


@api_view(["POST"])
def sub_create(request, pk):
  post_data = request.data
  serial = SubSerializer(data = post_data)
  serial.is_valid(raise_exception=True)
  serial.save()
  return Response({"message":"Submitted"},status=201)


@api_view(["GET", "PATCH", "DELETE"])
@parser_classes([FormParser, MultiPartParser ])
def sub_detail(request,pk):
  if request.method == "PATCH":
    put_data = request.data
    data = Submissions.objects.get(id=pk)
    serial = SubSerializer(data, data = put_data, partial=True)
    serial.is_valid(raise_exception=True)
    serial.save()
    return Response({"message":"Post Updated"}, status=200)

  elif request.method == "DELETE":
    pass
  data = Submissions.objects.select_related('user').get(id=pk)
  serial = SubSerializer(data)
  return Response(serial.data,status=200)


class SubmissionList(APIView):
  # def get_queryset(self):
  #   return Submissions.objects.select_related('user').all()
  
  # def get_serializer_class(self):
  #   return SubSerializer
  serializer_class = SubSerializer
  def get(self, request, *args, **kwargs):
    query = Submissions.objects.select_related('user').all()
    serializer = SubmissionDetailSerializer(query, many=True)
    return Response(serializer.data)
  
  def post(self, request, *args, **kwargs ):
    serializer = SubSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    query = Submissions.objects.select_related('user').all()
    serial = SubmissionDetailSerializer(query, many=True)
    return Response(serial.data, status = 201)
  
class SubDetail(APIView):
  def get(self,request,pk):
    query = Submissions.objects.select_related('user').prefetch_related('post').get(id=pk)
    serializer = SubmissionDetailSerializer(query)
    return Response(serializer.data)

  def post(self,request,pk):
    user_id = request.data["user_liked"]
    submission_id = request.data["submission"]
    query = FavPosts.objects.filter(submission=pk, user_liked=user_id)
    if query:
      # query = FavPosts.objects.get(submission=submission_id, user_liked=user_id)
      query.delete()
      query_data = Submissions.objects.select_related('user').get(id=pk)
      serializer =SubmissionDetailSerializer(query_data)
      return Response(serializer.data)
    serializer = FavSerializer(data = request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    query_data = Submissions.objects.select_related('user').prefetch_related('post').get(id=pk)
    serial = SubmissionDetailSerializer(query_data)
    return Response(serial.data)
  
  def patch(self, request, pk):
    query_object = Submissions.objects.select_related('user').prefetch_related('post').get(id=pk)
    data = request.data

    context = {
    "user" : query_object.user.id,
    'summary' : data.get("summary", query_object.summary),
    "description" : data.get("description", query_object.description),
    "image" :data.get("image", query_object.image),
    "name" : data.get("name", query_object.name),
    "git_link" : data.get("git_link", query_object.git_link),
    "other_link" : data.get("other_link", query_object.other_link),
    "hackathon_listing": data.get("hackathon_listing", query_object.hackathon_listing.id),
    # "name": "sub1 hack1",
    # "summary": "jknwedkn",
    # "description": "dmw en",
    # "image": null,
    # "create_at": "2023-05-13T01:00:27.632788+05:30",
    # "git_link": "https://github.com/",
    # "other_link": "https://youtube.com/",
    "isFav": data.get("isFav", query_object.isFav)
  }

    serial = SubSerializer(query_object,data=context)
    serial.is_valid(raise_exception=True)
    serial.save()
    serializer = SubmissionDetailSerializer(query_object)
    return Response(serializer.data)
  
  def delete(self, request, pk):
    query = Submissions.objects.get(id=pk)
    query.delete()
    return Response({"message":"Post Deleted"},status=200)


# not needed
class Fav_create(APIView):
  def get(self,request, pk):
    query =  FavPosts.objects.filter(submission=pk)
    serial = FavSerializer(query, many=True)
    return Response(serial.data)
  
  def post(self, request, pk):
    user_id = request.data["user_liked"]
    submission_id = request.data["submission"]
    if FavPosts.objects.filter(submission=submission_id, user_liked=user_id):
      query = FavPosts.objects.get(submission=submission_id, user_liked=user_id)
      query.delete()
      return Response({"msg":"delete"})
    query = FavSerializer(data = request.data)
    query.is_valid(raise_exception=True)
    query.save()
    return Response(query.data)


class UserHackathonListing(APIView):
  parser_classes = (MultiPartParser, FormParser)
  serializer_class = HackathonPostSerializer
  def get_queryset(self):
    hackathon_listings = HackathonListing.objects.select_related('creater').filter(creater=self.kwargs["pk"])
    return hackathon_listings
  
  def get(self,request, *args,**kwargs):
    try:
      id = request.query_params["id"]
      print(id,"jknkndjk")
      if id != None:
        hackathon = HackathonListing.objects.select_related('creater').prefetch_related("submissions").get(id=id)
        print(hackathon)
        serializer = HackathonListingSerializer(hackathon)
    except:  
      hackathon_listing = self.get_queryset()
      serializer = HackathonPostSerializer(hackathon_listing, many=True)
      
    return Response(serializer.data)

  def post(self, request, *args, **kwargs):
    print(request.data)
    serializer = HackathonPostSerializer(data= request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    hackathon_listing = self.get_queryset()
    serial = HackathonPostSerializer(hackathon_listing, many=True)
    return Response(serial.data, status=201)
  
  def patch(self, request, *args, **kwargs):
    
    # try:
      id=request.query_params["id"]
      # if id != None:
      # print("1")
      print(id)
      hackathon = HackathonListing.objects.select_related('creater').prefetch_related("submissions").get(id=id)
      print(hackathon)
      print(request.data)
      data = request.data
      print(data)
      context = {
        "creater": hackathon.creater.id,
        "title": data.get("title", hackathon.title),
        "summary": data.get("summary", hackathon.summary),
        "description": data.get("description", hackathon.description),
        "image": data.get("image", hackathon.image),
        "create_at" : data.get("create_at", hackathon.create_at),
        "start_date" : data.get("start_date", hackathon.start_date),
        'end_date' : data.get("end_date", hackathon.end_date),
        "reward" : data.get("reward", hackathon.reward)
      }
      print("2")
      serializer = HackathonPostSerializer(hackathon, data=context)
      print("3")
      serializer.is_valid(raise_exception=True)

      print("some")
      serializer.save()
      print('done')
      serial = HackathonListingSerializer(hackathon)
      return Response(serial.data, status=201)
    # except:
    #   return Response("No Data")

  def delete(self, request, *args, **kwargs):
    id = request.query_params["id"]
    query = HackathonListing.objects.get(id=id)
    query.delete()
    return Response({"message":"Post delete"}, status=200)

class SubmissionSingleList(APIView):
  def get_queryset(self):
    submissions = Submissions.objects.select_related('user').filter(hackathon_listing=self.kwargs["pk"])
    return submissions

  def get(self, request, *args, **kwargs):
    try:
      id= request.query_params['id']
      if id!=None:
        try:
          query = Submissions.objects.select_related('user').get(id=id)
          serializer = SubmissionDetailSerializer(query)
          return Response(serializer.data)
        except:
          return Response({"message":"No Data Found"})
    except:
      submission = self.get_queryset()
      serializer = SubmissionDetailSerializer(submission, many=True)

      return Response(serializer.data)
    
  def post(self, request, *args, **kwargs ):
    serializer = SubSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    query = Submissions.objects.select_related('user').all()
    serial = SubmissionDetailSerializer(query, many=True)
    return Response(serial.data, status = 201)