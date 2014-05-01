from rest_framework import serializers

from music_player import models


class TrackSerializer(serializers.ModelSerializer):
    album = serializers.Field(source='album.name')
    artist = serializers.Field(source='artist.name')
    src = serializers.Field(source='get_src')

    class Meta:
        model = models.Track
        fields = ('track_num', 'title', 'album', 'artist', 'src',)


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Artist


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Album


class SingleArtistSerializer(serializers.ModelSerializer):
    albums = AlbumSerializer(many=True)

    class Meta:
        model = models.Artist
        fields = ('name', 'slug', 'albums',)


class SingleAlbumSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True)

    class Meta:
        model = models.Album
        fields = ('name', 'slug', 'tracks',)
