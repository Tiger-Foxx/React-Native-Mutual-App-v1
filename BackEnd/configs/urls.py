from rest_framework import routers
from .api import ConfigViewSet

router = routers.DefaultRouter()
router.register('api/configs',ConfigViewSet,'configs')
urlpatterns = router.urls
