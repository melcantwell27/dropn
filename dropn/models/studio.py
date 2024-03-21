from django.db import models

class Studio(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    teachers = models.ManyToManyField("User", related_name='studios')

    def __str__(self):
        return self.name
