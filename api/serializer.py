from rest_framework import serializers
from .models import Submissions


class SubSerializer(serializers.ModelSerializer):
  class Meta:
    model = Submissions
    fields = "__all__"