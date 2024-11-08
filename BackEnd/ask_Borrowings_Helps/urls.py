from rest_framework import routers
from .api import Ask_Borrowings_HelpsViewSet
#from django.urls import path, include

router = routers.DefaultRouter()
router.register('api/ask_Borrowings_Helps',Ask_Borrowings_HelpsViewSet,'ask_Borrowings_Helps')
urlpatterns = router.urls


"""
from rest_framework import routers
from .api import BorrowingViewSet

router = routers.DefaultRouter()
router.register('api/borrowings',BorrowingViewSet,'borrowings')
urlpatterns = router.urls
"""