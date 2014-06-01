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
    serializer_class = serializers.TrackSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class VideosViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = Video.objects.all()
    serializer_class = serializers.VideoSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)