from rest_framework import routers
from .api import FondSocialViewSet, TresorerieViewSet,ActiveSessionViewSet,CloseSessionViewSet

router = routers.DefaultRouter()
router.register('api/fond_social', FondSocialViewSet, basename='fond_social')
router.register('api/tresorerie', TresorerieViewSet, basename='tresorerie')
router.register('api/active_session', ActiveSessionViewSet, basename='active_session')
router.register('api/closeSession', CloseSessionViewSet, basename='close_session')

urlpatterns = router.urls