from django.shortcuts import render
from .models import Submissions
from .serializer import SubSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework.generics import ListCreateAPIView

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)

    # Add custom claims
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


class SubmissionList(ListCreateAPIView):
  def get_queryset(self):
    return Submissions.objects.select_related('user').all()
  
  def get_serializer_class(self):
    return SubSerializer