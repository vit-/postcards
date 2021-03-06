from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic import TemplateView

from core import router as core_router

urlpatterns = patterns(
    '',
    # Examples:
    # url(r'^$', 'postcards.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', TemplateView.as_view(template_name='index.html')),

    url(r'^api/', include(core_router)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^jsreverse/$', 'django_js_reverse.views.urls_js', name='js_reverse'),
)
