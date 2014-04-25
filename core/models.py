from django.db import models


class Audio(models.Model):
    title = models.CharField(verbose_name='Audio title', max_length=256)
    path = models.TextField(verbose_name='File path')

    def __unicode__(self):
        return self.title
