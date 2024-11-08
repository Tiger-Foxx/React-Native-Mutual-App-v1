from rest_framework import routers
from .api import MemberViewSet, UnpaidObligatoryContributionMembersViewSet

router = routers.DefaultRouter()
router.register('api/members',MemberViewSet,'members')
router.register('api/obligatory_contributions/unpaid', UnpaidObligatoryContributionMembersViewSet, 'unpaid-members')
urlpatterns = router.urls
