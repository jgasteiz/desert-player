import os
import eyed3

from django.conf import settings
from django.core.management.base import BaseCommand

from desert_player.models import Track, Album, Artist

MEDIA_ROOT = settings.MEDIA_ROOT
AUDIO_FORMATS = ('mp3',)


class Command(BaseCommand):
    help = 'Updates the media models with the content of the external drive.'

    def handle(self, *args, **options):

        for path, subdirs, files in os.walk(MEDIA_ROOT):
            for filename in files:
                # If it's a valid track, we create the file.
                if any(audio_format in filename for audio_format in AUDIO_FORMATS):

                    file_path = '%s/%s' % (path, filename)
                    audio_file = eyed3.load(file_path)

                    tag = audio_file.tag

                    artist_name = tag.artist
                    if not artist_name:
                        artist_name = 'unnamed'

                    album_name = tag.album
                    if not album_name:
                        album_name = 'unnamed'

                    track_title = tag.title
                    if not track_title:
                        track_title = 'unnamed'

                    track_num = tag.track_num[0]
                    if not track_num:
                        track_num = 0

                    artist, created = Artist.objects.get_or_create(
                        name=artist_name)
                    album, created = Album.objects.get_or_create(
                        name=album_name,
                        artist=artist,
                    )
                    track, created = Track.objects.get_or_create(
                        title=track_title,
                        artist=artist,
                        album=album,
                        track_num=track_num,
                        path=file_path.replace(MEDIA_ROOT, ''),
                    )

                    print '%s, %s, %s' % (track, album, artist)
