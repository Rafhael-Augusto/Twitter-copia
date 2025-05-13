from rest_framework.routers import DefaultRouter
from .viewSets import *

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'replies', ReplyViewSet)
router.register(r'profiles', ProfileViewSet)


urlpatterns = router.urls