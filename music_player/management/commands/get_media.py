import os

from django.conf import settings
from django.core.management.base import BaseCommand

from core.models import Audio

MEDIA_ROOT = settings.MEDIA_ROOT
AUDIO_FORMATS = ('mp3',)


class Command(BaseCommand):
    help = 'Updates the media models with the content of the external drive.'

    def handle(self, *args, **options):

        for path, subdirs, files in os.walk(MEDIA_ROOT):
            for filename in files:
                # If it's a valid audio, we create the file.
                if any(audio_format in filename for audio_format in AUDIO_FORMATS):
                    audio_qs = Audio.objects.filter(title=filename)
                    if len(audio_qs) == 0:
                        audio = Audio(
                            path=path.replace(MEDIA_ROOT, ''),
                            title=filename
                        )
                        audio.save()
                        print 'Created %s' % audio.title
                    else:
                        print '%s exists already' % filename
