from django import forms
from django.contrib.auth.forms import UserCreationForm
from ..models import User

class UserRegistrationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('username', 'password1', 'password2')  # Include any additional fields you want for registration
