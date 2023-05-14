from django.urls import path, include
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)



urlpatterns = [
  # path("submissions", views.submissions), not needed
  path('listings/<int:pk>/', views.UserHackathonListing.as_view()),
  path('listings/submissions/<int:pk>/', views.SubmissionSingleList.as_view()),


  path('submissions', views.SubmissionList.as_view()),
  # path("submissions/<int:pk>", views.sub_detail), not needed
  path('submissions/<int:pk>', views.SubDetail.as_view()),
  path("submissions/create", views.sub_create), #not needed
  path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('auth/', include('djoser.urls')),
  path('auth/', include('djoser.urls.jwt')),
  path('fav/<int:pk>',views.Fav_create.as_view()), #not needed
]