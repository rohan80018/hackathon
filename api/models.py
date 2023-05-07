from django.db import models
import random
from django.contrib.auth.models import AbstractUser

def upload_path(instance, filename):
  return "/".join([str(instance.title) + str(random.randint(0, 10000)), filename])

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)

class Submissions(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  title = models.CharField(max_length=25)
  summary = models.CharField(max_length=85)
  description = models.CharField(max_length=3000)

  image = models.ImageField(upload_to= upload_path)

  name = models.CharField(max_length=25)

  create_at = models.DateTimeField(auto_now_add=True)

  git_link = models.URLField()
  other_link = models.URLField()

class Fav_Posts(models.Model):
  submission = models.ForeignKey(Submissions, on_delete=models.CASCADE)
  user_liked = models.ForeignKey(User, on_delete=models.CASCADE)