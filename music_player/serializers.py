from rest_framework import serializers

from music_player.models import Audio

class AudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audio
