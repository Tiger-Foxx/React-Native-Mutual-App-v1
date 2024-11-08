 
from django.contrib import admin
from django.urls import path,include
from django.conf  import settings
from django.conf.urls.static  import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')),
    path('', include('api.urls')),
    path('', include('members.urls')),
    path('', include('users.urls')),
    path('', include('borrowing_savings.urls')),
    path('', include('borrowings.urls')),
    path('', include('contributions.urls')),
    path('', include('exercises.urls')),
    path('', include('helps.urls')),
    path('', include('refunds.urls')),
    path('', include('savings.urls')),
    path('', include('configs.urls')),
    path('', include('help_types.urls')),
    path('', include('sessions_.urls')),
    path('', include('administrators.urls')),
    path('', include('obligatory_contributions.urls')),
    path('', include('ask_Borrowings_Helps.urls')),
    

]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)