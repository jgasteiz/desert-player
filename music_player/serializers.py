from rest_framework import serializers

from music_player import models

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Artist
        fields = ('name', 'slug',)


class AlbumSerializer(serializers.ModelSerializer):
    artist = serializers.Field(source='artist.name')

    class Meta:
        model = models.Album
        fields = ('name', 'slug', 'artist',)


class AudioSerializer(serializers.ModelSerializer):
    album = serializers.Field(source='album.name')
    artist = serializers.Field(source='artist.name')

    class Meta:
        model = models.Audio
        fields = ('track_num', 'title', 'album', 'artist',)
