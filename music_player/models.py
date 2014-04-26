from django.db import models
from django.conf import settings


class Audio(models.Model):
    title = models.CharField(verbose_name='Audio title', max_length=256)
    path = models.TextField(verbose_name='File path')

    def __unicode__(self):
        return self.title

    def get_audio_url(self):
        return '%s%s/%s' % (settings.MEDIA_URL, self.path, self.title)
