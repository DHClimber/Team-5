from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.shortcuts import render
from .forms import UploadFileForm
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework.views import APIView
from file_serv.serializers import (uploadSerializer)
from rest_framework.response import Response
from rest_framework import status
import json

# Imaginary function to handle an uploaded file.
from .apps import handle_uploaded_file

class UploadFileAPIView(APIView):
    serializer_class = uploadSerializer

    def post(self, request):
        file = request.data
        message = handle_uploaded_file(file)
        result = "OK"
        url = ""
        if message == "File size too large":
            result = "File size too large"
        elif message == "Unacceptable file type":
            result = "Unacceptable file type"
        else:
            url = message

        filler  = {}
        filler["url"] = url
        filler["result"] = result
        payload = json.dumps(filler)
     
        return Response(payload, status=status.HTTP_200_OK)

    
