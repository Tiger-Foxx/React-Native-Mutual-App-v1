from rest_framework import routers
from .api import HelpViewSet

router = routers.DefaultRouter()
router.register('api/helps',HelpViewSet,'helps')
urlpatterns = router.urls
