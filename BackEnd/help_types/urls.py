from rest_framework import routers
from .api import HelpTypeViewSet

router = routers.DefaultRouter()
router.register('api/help_types',HelpTypeViewSet,'help_types')
urlpatterns = router.urls
