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
"result": "<message returned>"
}

# User Account Creation

- end point = http://localhost:8000/auth/register/
- method = POST
- Content-Type: application/json
- body: <br>
  { <br>
  "username": "username_here",<br>
  "email": "email_here",<br>
  "password": "password_here",<br>
  "first_name": "name_here",<br>
  "last_name": "name_here",<br>
  "phone_number": "number_here"<br>
  }<br>

* return: <br>
  - {<br>
    - "data": { <br>
    - "username": "username_here",<br>
    - "email": "email_here",<br>
    - "password": "password_here",<br>
    - "first_name": "name_here",<br>
    - "last_name": "name_here",<br>
    - "phone_number": "number_here"<br>
    - }<br>
  - }

# Community Creation

- end point = http://localhost:8000/event/community
- method = POST
- headers: {
  - Content-Type: "application/json",
  - Authorization: "Bearer `_tokenhere_`"
- }
- body: {

  - "community_name": "community1",
  - "city": "The City",
  - "state": "FL"

- }
- **Response**
  - {
    - "id": 1,
    - "admin": 8,
    - "community_name": "community1",
    - "city": "The City",
    - "state": "FL"
  - }

# Fetch Communities

- end point = http://localhost:8000/event/community
- method = POST
- headers: {
  - Content-Type: "application/json",
  - Authorization: "Bearer `_tokenhere_`"
- }

- **Response**
- [
  - {
    - "id": 1,
    - "admin": 8,
    - "community_name": "community1",
    - "city": "The City",
    - "state": "FL"
  - }
- ]
