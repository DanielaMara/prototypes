from django.conf.urls import patterns, include, url

urlpatterns = [
    url(r'^$', 'simplemooc.courses.views.index', name='index'),
    #url(r'^(?P<pk>\d+)/$', 'simplemooc.courses.views.details', name='details'),
    url(r'^(?P<slug>[\w_-]+)/$', 'simplemooc.courses.views.details', name='details'),
]
