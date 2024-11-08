from rest_framework import routers
from .api import ExerciseViewSet

router = routers.DefaultRouter()
router.register('api/exercises',ExerciseViewSet,'exercises')
urlpatterns = router.urls
