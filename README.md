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
    - "admin": {
      - "first_name": "First",
      - "last_name": "Last",
      - "email": "email@mail.com",
      - "phone": "1112223333",
        -},
    - "community_name": "community1",
    - "city": "The City",
    - "state": "FL"
  - }
- ]

# Refresh Access Token

- end point = http://localhost:8000/auth/refresh/
- method = POST
- headers: {
  - Content-Type: "application/json",
  - Body: {
    - "refresh": "refresh_token_here"
  - }
- }

**Response**

- {
  - "access": "new_access_token_here"
- }

# Event Creation Submission

- end point = http://localhost:8000/event/community/events/
- method = POST
- headers: {
  - Content-Type: "application/json",
  - Authorization: "Bearer **tokenhere**"
  - Body: {
    - "event_name": "Event 42",
    - "street_address": "123 road",
    - "city": "City",
    - "state": "FL",
    - "zipcode": "33548",
    - "building_number": "2", // this field is optional
    - "start_date": "2023-12-01",
    - "end_date": "2023-12-02",
    - "start_time": "12:00:00",
    - "end_time": "13:00:00",
    - "community_id": 1
  - }
- }

**Response**

- {
  - "id": 7,
  - "event_name": "Event 42",
  - "street_address": "123 road",
  - "city": "City",
  - "state": "FL",
  - "zipcode": "33548",
  - "building_number": "2",
  - "start_date": "2023-12-01",
  - "end_date": "2023-12-02",
  - "start_time": "12:00:00",
  - "end_time": "13:00:00",
  - "community": 1
- }

# Get Events for a Community

- end point = http://localhost:8000/event/community/events/?community*id=\_COMMUNITY_ID_INT_HERE*
- method: GET
- headers: {
  - Content-Type: "application/json",
  - Authorization: "Bearer **tokenhere**"
- }

**Response**

- [
  - {
    - "id": 1,
    - ...
  - } ,
  - {}, ....
- ]

# Get States for Dropdown

- endpoint = http://localhost:8000/event/community/events/states
- method: GET
- headers: {
  - Content-Type: "application/bearer"
- }
