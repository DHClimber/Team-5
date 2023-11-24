from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.shortcuts import render
from .forms import UploadFileForm
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

# Imaginary function to handle an uploaded file.
from .apps import handle_uploaded_file

@csrf_exempt
def upload_fileAPI(request):
    print(request.POST)
    print(request.FILES)

    if request.method == "POST":
        message = handle_uploaded_file(request.FILES)
        if message == "File size too large":
            response = {
            "name": "http.response.status",
            "value": "HTTP/1.1 400",
            "message": "file size too large"
	        }
            return JsonResponse(response)
        elif message == "Unacceptable file type":
            response = {
            "name": "http.response.status",
            "value": "HTTP/1.1 400",
            "message": "unacceptable file type!"
	        }

            return JsonResponse(response)
        else:
            url = message
            response = {
            "name": "http.response.status",
            "value": "HTTP/1.1 200",
            "url": f"{url}",
            "status": "upload complete"
	        }

            response = JsonResponse(response)
            return response

    response = {
	    "name": "http.response.status",
	    "value": "HTTP/1.1 400",
        "message": "only POST request is accepted"
	}
    return JsonResponse(response)

@csrf_exempt
def upload_file(request):
    print(request.POST)
    print(request.FILES)
    if request.method == "POST":
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            message = handle_uploaded_file(request.FILES)
            if message == "File size too large":
                return render(request,"registration/upload.html",{"form": form, "body": "File size too large!"})
            elif message == "Unacceptable file type":
                return render(request,"registration/upload.html",{"form": form, "body": "Unacceptable file type!"})

            else:
                url = message
                return render(request,"registration/upload.html",{"form": form, "message": "File Upload Complete = ","url": f"{url}"})
    else:
        form = UploadFileForm()
    return render(request, "registration/upload.html", {"form": form})