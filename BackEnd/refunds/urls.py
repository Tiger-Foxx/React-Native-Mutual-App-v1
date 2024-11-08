from rest_framework import routers
from .api import RefundViewSet

router = routers.DefaultRouter()
router.register('api/refunds',RefundViewSet,'refunds')
urlpatterns = router.urls
