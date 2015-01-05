from rest_framework import routers
from core import views


router = routers.SimpleRouter()
router.register(r'collection', views.CollectionViewSet,
                base_name='collection')
router.register(r'postcard', views.PostcardViewSet,
                base_name='postcard')

urlpatterns = router.urls
