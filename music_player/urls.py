from django.conf import settings
from django.conf.urls import patterns, include, url
from rest_framework import viewsets, routers

from music_player.models import Audio
from .views import AppView
from . import api


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'artists', api.ArtistsViewSet)
router.register(r'albums', api.AlbumsViewSet)
router.register(r'songs', api.SongsViewSet)



urlpatterns = patterns('',
    url(r'^$', AppView.as_view(), name='home'),

    url(r'^_api/', include(router.urls)),
    url(r'^_api-auth/', include('rest_framework.urls', namespace='rest_framework')),
)

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += patterns('',
        (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.MEDIA_ROOT}))
