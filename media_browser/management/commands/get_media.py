import os

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from django.utils.text import slugify

from core.models import Video

MEDIA_ROOT = settings.MEDIA_ROOT
VIDEO_FORMATS = ('mp4', 'mkv')


class Command(BaseCommand):
    help = 'Updates the media models with the content of the external drive.'

    def handle(self, *args, **options):

        for path, subdirs, files in os.walk(MEDIA_ROOT):
            for filename in files:
                # If it's a valid video, we create the file.
                if any(video_format in filename for video_format in VIDEO_FORMATS):
                    video_qs = Video.objects.filter(title=filename)
                    if len(video_qs) == 0:
                        video = Video(
                            path=path.replace(MEDIA_ROOT, ''),
                            title=filename
                        )
                        video.save()
                        print 'Created %s' % video.title
                    else:
                        print '%s exists already' % filename
