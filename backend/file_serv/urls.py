from django.urls import path
from file_serv.views import UploadFileAPIView, GetFiles

urlpatterns = [
    path('uploadAPI/', UploadFileAPIView.as_view(), name="upload-file-api"),
    path('get-files/', GetFiles.as_view(), name="get-files"),
    
]
