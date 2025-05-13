from rest_framework import viewsets
from .models import *
from .serializers import *

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer

class ReplyViewSet(viewsets.ModelViewSet):
    queryset = Reply.objects.all().order_by('-likes')
    serializer_class = ReplySerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer