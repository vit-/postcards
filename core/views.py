from rest_framework import viewsets

from core import models, serializers


class CollectionViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.CollectionSerializer

    def get_queryset(self):
        return models.Collection.objects.filter(user=self.request.user)


class PostcardViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.PostcardSerializer
    filter_fields = ['collections']

    def get_queryset(self):
        return models.Postcard.objects.filter(
            collections__user=self.request.user
        ).distinct()
