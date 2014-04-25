from django.conf.urls import patterns, url

from .views import (HomeView, VideoDetailView, VideoListView)


urlpatterns = patterns('',
    url(r'^videos/$', VideoListView.as_view(), name='video_list'),
    url(r'^videos/(?P<pk>\d+)/$', VideoDetailView.as_view(), name='video_detail'),

    url(r'^$', HomeView.as_view(), name='home'),
)
