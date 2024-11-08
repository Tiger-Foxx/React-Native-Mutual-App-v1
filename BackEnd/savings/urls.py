from rest_framework import routers
from .api import SavingViewSet

router = routers.DefaultRouter()
router.register('api/savings',SavingViewSet,'savings')
urlpatterns = router.urls
