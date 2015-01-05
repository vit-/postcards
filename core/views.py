from rest_framework import viewsets

from core import models
from core import serializers


class CollectionViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.CollectionSerializer

    def get_queryset(self):
        return models.Collection.objects.filter(user=self.request.user)


class PostcardViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.PostcardSerializer

    def get_queryset(self):
        return models.Postcard.objects.filter(
            collections__user=self.request.user
        ).distinct()
