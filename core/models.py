from django.db import models


class Video(models.Model):
    title = models.CharField(verbose_name='Video title', max_length=256)
    path = models.TextField(verbose_name='File path')

    def __unicode__(self):
        return self.title
