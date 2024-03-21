from django.db import models

class DanceClass(models.Model):
    class_name = models.CharField(max_length=100)
    datetime = models.DateTimeField()
    studio = models.ForeignKey("Studio", on_delete=models.CASCADE,  blank=True, null = True)
    teacher = models.ForeignKey('User', on_delete=models.CASCADE, related_name='teaching', blank=True, null=True)
    students = models.ManyToManyField('User', related_name='enrolled')
    genre = models.ForeignKey('Genre', on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.class_name 
