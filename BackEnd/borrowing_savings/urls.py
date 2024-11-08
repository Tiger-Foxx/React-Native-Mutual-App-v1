from rest_framework import routers
from .api import Borrowing_SavingViewSet

router = routers.DefaultRouter()
router.register('api/borrowing_savings',Borrowing_SavingViewSet,'borrowing_savings')
urlpatterns = router.urls
