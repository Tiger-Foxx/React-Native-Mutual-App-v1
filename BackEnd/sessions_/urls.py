from rest_framework import routers
from .api import  SessionViewSet
router = routers.DefaultRouter()
router.register('api/sessions_',SessionViewSet,'sessions_')
urlpatterns = router.urls
