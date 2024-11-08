from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, CreatePost, UpdateProfileAPI
from knox import views as knox_views

urlpatterns = [
  path('api/auth', include('knox.urls')),
  path('api/user/create', CreatePost.as_view()),
  path('api/auth/register', RegisterAPI.as_view()),
  path('api/auth/login', LoginAPI.as_view()),
  path('api/auth/user', UserAPI.as_view()),
  path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
  path('api/auth/update_profile/<int:pk>/', UpdateProfileAPI.as_view()),
]