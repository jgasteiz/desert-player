import os

from django.conf import settings
from django.core.management.base import BaseCommand

from desert_player.models import Video

MEDIA_ROOT = settings.MEDIA_ROOT
VIDEO_FORMATS = ('avi', 'mp4', 'mkv',)


class Command(BaseCommand):
    help = 'Updates the media models with the content of the external drive.'

    def handle(self, *args, **options):

        for path, subdirs, files in os.walk(MEDIA_ROOT):
            for filename in files:
                # If it's a valid video file, we create the file.
                if any(video_format in filename for video_format in VIDEO_FORMATS):

                    file_path = '%s/%s' % (path, filename)

                    video, created = Video.objects.get_or_create(
                        title=filename,
                        path=file_path.replace(MEDIA_ROOT, ''),
                    )

                    print video
