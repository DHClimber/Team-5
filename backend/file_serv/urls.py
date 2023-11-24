from django.urls import path
from file_serv.views import upload_file, upload_fileAPI

urlpatterns = [
    path('upload/', upload_file, name="upload-file"),
    path('uploadAPI/', upload_fileAPI, name="upload-file-api"),
]
