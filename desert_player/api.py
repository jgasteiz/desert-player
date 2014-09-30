from django.core.paginator import Paginator
from rest_framework import permissions
from rest_framework import viewsets

from .models import Track, Album, Artist, Video
from . import serializers


class ArtistsViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = Artist.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return serializers.SingleArtistSerializer
        return serializers.ArtistSerializer


class AlbumsViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = Album.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return serializers.SingleAlbumSerializer
        return serializers.AlbumSerializer


class TracksViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = Track.objects.all()
    model = Track
    serializer_class = serializers.TrackSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        if 'paginateBy' in self.request.GET:
            paginate_by = self.request.GET.get('paginateBy')
            page = self.request.GET.get('page', 1)
            tracks = self.model.objects.all()
            p = Paginator(tracks, paginate_by)
            return p.page(page)
        return super(TracksViewSet, self).get_queryset()


class VideosViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = Video.objects.all()
    serializer_class = serializers.VideoSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)