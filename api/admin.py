from django.contrib import admin
from .models import Submissions, User, HackathonListing

# Register your models here.
admin.site.register(HackathonListing)
admin.site.register(Submissions)
admin.site.register(User)