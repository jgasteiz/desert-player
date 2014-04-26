from rest_framework import serializers

from music_player.models import Audio

class AudioSerializer(serializers.ModelSerializer):
    url = serializers.CharField(source='get_audio_url', read_only=True)

    class Meta:
        model = Audio
        fields = ('title', 'url')
