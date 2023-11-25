# Group5
CEN3031 UFL Fall 2023
Group 5

Members:
Kurt Weber
Eddy Rosales
Khai Dao
Daniel Hitchcock

The Forwarders

##REST password reset:##
end point = http://127.0.0.1:8000/mail_serv/
#required header:# 
Content-Type:application/json
X-CSRFToken:<Token Value>
#body:#
{"email": "<email>"}

##REST file upload:##
end point = http://localhost:8000/file_serv/uploadAPI/
method = POST
#required header:# 
Content-Type:application/json
#body:#
{"file": "<file data>"}

##return json format##
{
    "name": "http.response.status",
    "value": "HTTP/1.1 200",
    "url": "media/uploads/1700846721.748402-testpdf.pdf",
    "status": "upload complete"
}