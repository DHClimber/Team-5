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

# Community messages

Authentication is NOT required

method = GET
# View Events

# end point
/forum/event/
  returns all messages for all evernts (not really needed)

# end point
/forum/event/?event_id=<whatever is used to identify the event>
  returns only messages for the specific event noted

 # Post messages to event discussion

 method = POST

Authentication is required using permissions class, expects Bearer authorization token in the header.

*this is what was used for postman testing "access token from login"
{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxNjU0NTA2LCJpYXQiOjE3MDE2NTQyMDYsImp0aSI6IjZiNDg1M2Q3MDZjNzQ1NjZiNGEwODYwOGU0MzgzYWM5IiwidXNlcl9pZCI6MX0.t-gYN2T9fTs-XReTaAa7evut7V3lw9LJ0xh_lh0WQbI"}

# end point:
/forum/event/post/

will post without expected input, but expected body is below for it to work correctly:

body = {"Message": <user comments>, "EventId": <event id>}

# Delete messages

## Delete a single message

 method = POST

Authentication is required using permissions class, expects Bearer authorization token in the header.

# end point:
/forum/delete/

with no body, nothing will be deleted and return "match not found"

expected body:

message id is the field noted as only "id" return when viewing events
# this deleted only the indicated message if found
{"MessageId": <message id>}

# this will delete every message for all events - only useful for testing
{"MessageId": "all"}



