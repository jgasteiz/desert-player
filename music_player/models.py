from django.db import models
from django.conf import settings

from autoslug.fields import AutoSlugField


class Artist(models.Model):
    name = models.CharField(verbose_name='Artist name', max_length=256)
    slug = AutoSlugField(populate_from='name')

    def __unicode__(self):
        return self.name


class Album(models.Model):
    name = models.CharField(verbose_name='Album name', max_length=256)
    slug = AutoSlugField(populate_from='name')

    artist = models.ForeignKey('artist')

    def __unicode__(self):
        return self.name


class Audio(models.Model):
    track_num = models.IntegerField(verbose_name='Track number')
    title = models.CharField(verbose_name='Audio title', max_length=256)
    path = models.TextField(verbose_name='File path')

    album = models.ForeignKey('album')
    artist = models.ForeignKey('artist')

    def __unicode__(self):
        return self.title
