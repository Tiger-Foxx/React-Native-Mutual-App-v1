from rest_framework import routers
from .api import Obligatory_ContributionViewSet

router = routers.DefaultRouter()
router.register('api/obligatory_contributions',Obligatory_ContributionViewSet,'obligatory_contributions')
urlpatterns = router.urls
