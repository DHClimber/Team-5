from django.urls import path

from .views import redirect_view

from . import views

urlpatterns = [
path('send_mail/', views.mail_serv),
path('', views.redirect_view), 
]
