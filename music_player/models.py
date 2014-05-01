from django.conf import settings
from django.db import models

from autoslug.fields import AutoSlugField


class Artist(models.Model):
    name = models.CharField(verbose_name='Artist name', max_length=256)
    slug = AutoSlugField(populate_from='name')

    def __unicode__(self):
        return self.name

    def get_absolute_url(self):
        return 'meh'


class Album(models.Model):
    name = models.CharField(verbose_name='Album name', max_length=256)
    slug = AutoSlugField(populate_from='name')

    artist = models.ForeignKey('artist', related_name='albums')

    def __unicode__(self):
        return self.name

    def get_absolute_url(self):
        return 'meh'


class Track(models.Model):
    track_num = models.IntegerField(verbose_name='Track number')
    title = models.CharField(verbose_name='Track title', max_length=256)
    path = models.TextField(verbose_name='File path')

    album = models.ForeignKey('album', related_name='tracks')
    artist = models.ForeignKey('artist')

    def __unicode__(self):
        return self.title

    def get_src(self):
        return '%s%s' % (settings.MEDIA_URL, self.path)
