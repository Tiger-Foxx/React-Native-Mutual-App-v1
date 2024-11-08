from rest_framework import routers
from .api import ContributionViewSet

router = routers.DefaultRouter()
router.register('api/contributions',ContributionViewSet,'contributions')
urlpatterns = router.urls
