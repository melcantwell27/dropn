# Import view classes for easier access
from .dance_class_views import *
from .student_views import *
from .studio_views import *
from .teacher_views import *
from .user_views import *

# Define __all__ array to specify which symbols should be imported when using "from views import *"
__all__ = [
    'dance_class_list',
    'dance_class_detail',
    'student_list', 
    'student_detail',
    'studio_list', 
    'studio_detail',
    'teacher_list', 
    'teacher_detail',
    'register',
    'user_login',
    'get_user_dance_classes',
    'enroll',
    'unenroll',
    'create_class',
    'delete_class', 
    'teacher_schedule',
    'user_logout',
    'check_user_logged_in'
]