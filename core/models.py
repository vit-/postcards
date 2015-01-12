from django.conf import settings
from django.db import models


MAX_NAME_LENGTH = 256


class Collection(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    name = models.CharField(max_length=MAX_NAME_LENGTH)
    parent = models.ForeignKey('self', blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def __repr__(self):
        return '<{cls}: {name}>'.format(
            cls=self.__class__.__name__,
            name=self.__str__()
        )


class Postcard(models.Model):
    collections = models.ManyToManyField('Collection')
    image_face = models.FileField(blank=True, null=True)
    image_back = models.FileField(blank=True, null=True)
    received = models.DateTimeField()
    name = models.CharField(max_length=MAX_NAME_LENGTH, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        name = [self.received.isoformat()]
        if self.name:
            name.append(self.name)
        return '_'.join(name)

    def __repr__(self):
        return '<{cls}: {name}>'.format(
            cls=self.__class__.__name__,
            name=self.__str__()
        )
