from rest_framework import routers
from .api import AdministratorViewSet

router = routers.DefaultRouter()
router.register('api/administrators',AdministratorViewSet,'administrators')
urlpatterns = router.urls
