from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager, PermissionsMixin)
from rest_framework_simplejwt.tokens import RefreshToken

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, username, email, first_name, last_name, phone_number, password=None):
        if (username is None):
            raise TypeError('Users should have a username')
        if (email is None):
            raise TypeError('Users should have an email')
        if not first_name:
            raise TypeError('Users should have a first name')
        if not last_name:
            raise TypeError('Users should have a last name')
        if not phone_number:
            raise TypeError('Users should have a phone name')

        user = self.model(
            username=username, 
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number    
        )
        user.set_password(password)
        user.save()
        return user
    

class User(AbstractBaseUser):
    username = models.CharField(max_length=255, unique=True, db_index=True)
    email = models.EmailField(max_length=255, unique=True, db_index=True)
    is_verified = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    phone_number = models.CharField(max_length=10)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'phone_number']

    objects = UserManager()

    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }