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