from django.db import models

# Create your models here.
class Longerurl(models.Model):
    url = models.CharField(max_length=1000)
    slug = models.CharField(max_length=1000)
    def __str__(self) -> str:
        return f"Short Url for: {self.url} : {self.slug}"