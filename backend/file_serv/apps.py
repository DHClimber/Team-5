from django.apps import AppConfig
from datetime import datetime


class FileServConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "file_serv"

#filetype checking
def acceptable_file(file_type):
    acceptable = ["application/pdf", "image/png", "image/jpg", "image/jpeg"]
    if file_type in acceptable:
        return True
    else:
        return False

#filesize check
def file_size_check(file_size):
    limit = 5 #file size limit in MB
    if file_size <= limit * 1000000:
        return True
    else:
        return False

#file handlers
#Saves files to media/uploads/
#adds timestamp + original filename
def handle_uploaded_file(file):
    f = file["file"]
    file_type = f.content_type
    file_size = f.size
    filename = f.name
  
    accept_type = acceptable_file(file_type)
    print(file_type)
    if not accept_type:
        return "Unacceptable file type"

    accept_size = file_size_check(file_size)
    if not accept_size:
        return "File size too large"

    now = datetime.now()
    stamp = datetime.timestamp(now)
    #url where new file is saved, should be returned fo successful upload
    url = f"media/uploads/{stamp}" + '-' + f"{filename}"

    with open(url, "wb+") as destination:
        for chunk in f.chunks():
            destination.write(chunk)
    #return link when successful
    return url
