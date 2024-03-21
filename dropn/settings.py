from pathlib import Path
from decouple import config
import os
from dropn.authentication import NoCSRFSessionAuthentication


BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-n73n*9-zp@^5nr10(3vhdq6*1l_(&08c%7pyfoxi&_qjfsnbxg'

DEBUG = True

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

INSTALLED_APPS = [
    'jazzmin',
    'dropn', 
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',  # Add corsheaders to installed apps
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'dropn.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # 'DIRS': [],
        'DIRS': [os.path.join(BASE_DIR, "app/build")],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'dropn.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME', default='', cast=str),
        'USER': config('DB_USER', default='', cast=str),
        'PASSWORD': config('DB_PASSWORD', default='', cast=str),
        'HOST': 'localhost',
        'PORT': '5432',
    }
}


AUTH_USER_MODEL = 'dropn.User'

# SESSION_COOKIE_NAME = 'sessionid'


# AUTHENTICATION_BACKENDS = [
#     'django.contrib.auth.backends.ModelBackend',
# ]

# REST_FRAMEWORK = {
#     'DEFAULT_AUTHENTICATION_CLASSES': (
#         'rest_framework_simplejwt.authentication.JWTAuthentication',
#     ),
# }

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        #"rest_framework.authentication.SessionAuthentication",
        "dropn.authentication.NoCSRFSessionAuthentication",
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ],
}

SESSION_COOKIE_SAMESITE = None
SESSION_ENGINE = 'django.contrib.sessions.backends.db'
SESSION_COOKIE_AGE = 1209600  # Set the session cookie age in seconds (e.g., 2 weeks)

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

CORS_ALLOW_CREDENTIALS = True  # Allow credentials to be included in CORS requests

# CORS_ALLOW_METHODS = [
#     'DELETE',
#     'GET',
#     'OPTIONS',
#     'PATCH',
#     'POST',
#     'PUT',
# ]

# CORS_ALLOW_HEADERS = [
#     'accept',
#     'accept-encoding',
#     'authorization',
#     'content-type',
#     'dnt',
#     'origin',
#     'user-agent',
#     'x-csrf-token',
#     'x-requested-with',
# ]

# CORS_ALLOW_HEADERS = ['*']

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/New_York'

USE_I18N = True

USE_TZ = True

STATIC_URL = '/static/'

# Additional directories where Django will look for static files during development.
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'dropn/static'),
]


# Directory where collected static files will be stored for deployment.
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'