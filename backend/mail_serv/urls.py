from django.urls import path

from .views import passwordResetAPI

from . import views

urlpatterns = [
path('send_mail/', views.mail_serv),
path('', passwordResetAPI.as_view()), 
]
