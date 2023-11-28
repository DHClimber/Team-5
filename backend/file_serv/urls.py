from django.urls import path
from file_serv.views import UploadFileAPIView

urlpatterns = [
    path('uploadAPI/', UploadFileAPIView.as_view(), name="upload-file-api"),
    
]
