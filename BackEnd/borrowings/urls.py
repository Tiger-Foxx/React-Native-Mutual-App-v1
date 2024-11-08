from rest_framework import routers
from .api import BorrowingViewSet

router = routers.DefaultRouter()
router.register('api/borrowings',BorrowingViewSet,'borrowings')
urlpatterns = router.urls
