# models/user.py
from django.db import models
from django.contrib.auth.models import AbstractUser

#all Users (teacher or student) have the same available fields, what will be available on Front End depends on role
class User(AbstractUser):
    is_student = models.BooleanField(default=True)
    is_teacher = models.BooleanField(default=False)
    bio = models.CharField(blank=True, null=True)