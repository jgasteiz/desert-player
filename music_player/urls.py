from django.conf import settings
from django.conf.urls import patterns, include, url

from rest_framework import viewsets, routers

from core.models import Audio
from .views import HomeView


# ViewSets define the view behavior.
class AudioViewSet(viewsets.ModelViewSet):
    model = Audio

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'audio', AudioViewSet)

urlpatterns = patterns('',
    url(r'^$', HomeView.as_view(), name='home'),

    url(r'^_api/', include(router.urls)),
    url(r'^_api-auth/', include('rest_framework.urls', namespace='rest_framework')),
)

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += patterns('',
        (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.MEDIA_ROOT}))