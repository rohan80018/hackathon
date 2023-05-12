from django.db import models
import random
from django.contrib.auth.models import AbstractUser

def upload_path(instance, filename):
  return "/".join([str(instance.title) + str(random.randint(0, 10000)), filename])

# Create your models here.
class User(AbstractUser):
  email = models.EmailField(unique=True)
  isCreater = models.BooleanField(default=False)


class HackathonListing(models.Model):
  creater = models.ForeignKey(User, on_delete=models.CASCADE, related_name="creater_detail")
  title = models.CharField(max_length=25)
  summary = models.CharField(max_length=85)
  description = models.CharField(max_length=3000)

  image = models.ImageField(upload_to= upload_path, blank=True, null=True)

  create_at = models.DateTimeField(auto_now_add=True)
  start_date = models.DateTimeField()
  end_date = models.DateTimeField()
  reward = models.CharField(max_length=100)

class Submissions(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_detail")

  hackathon_listing = models.ForeignKey(HackathonListing, on_delete=models.CASCADE, related_name="submissions", default=True)
  # hackathon_listing = models.ForeignKey(HackathonListing, on_delete=models.CASCADE, related_name="submissions", default=True)

  name = models.CharField(max_length=25)

  summary = models.CharField(max_length=85)
  description = models.CharField(max_length=3000)

  image = models.ImageField(upload_to= upload_path, blank=True, null=True)

  create_at = models.DateTimeField(auto_now_add=True)

  git_link = models.URLField()
  other_link = models.URLField()

  isFav = models.BooleanField(default=False)

class FavPosts(models.Model):
  hackathon = models.ForeignKey(HackathonListing, on_delete = models.CASCADE, related_name="listing", default=True)
  submission_id = models.ForeignKey(Submissions, on_delete=models.CASCADE, related_name="post")
  # user_liked = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")