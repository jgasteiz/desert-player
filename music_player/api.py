from rest_framework import permissions
from rest_framework import viewsets

from .models import Audio, Album, Artist
from . import serializers


class ArtistsViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = Artist.objects.all()
    serializer_class = serializers.ArtistSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class AlbumsViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = Album.objects.all()
    serializer_class = serializers.AlbumSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class SongsViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = Audio.objects.all()
    serializer_class = serializers.AudioSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)