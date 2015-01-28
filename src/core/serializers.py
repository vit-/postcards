from rest_framework.serializers import ModelSerializer, ValidationError

from core import models


class CollectionSerializer(ModelSerializer):

    def create(self, data):
        data['user'] = self.context['request'].user
        return super(CollectionSerializer, self).create(data)

    class Meta:
        model = models.Collection
        fields = ('id', 'name', 'parent')


class PostcardSerializer(ModelSerializer):

    def validate_collections(self, values):
        for value in values:
            # request.user is simple lazy object
            if not value.user.id == self.context['request'].user.id:
                raise ValidationError('Adding postcards to foreign '
                                      'collecions is not allowed')
        return values

    class Meta:
        model = models.Postcard
        exclude_fields = ('created', 'updated')
