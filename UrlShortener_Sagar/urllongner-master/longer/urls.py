from django.contrib import admin
from django.urls import path,include
from . import views 
urlpatterns = [
    path("",views.url_longener,name="url_longener"),
    path("<str:slugs>",views.url_redirect,name="url_redirect"),
]