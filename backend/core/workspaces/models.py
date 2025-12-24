from django.db import models

# Create your models here.

class Workspace(models.Model):
    WORKSPAACE_TYPES = [
        ('PRIVATE_OFFICE', 'Private Office'),
        ('MEETING_ROOM', 'Meeting Room'),
        ('HOT_DESK', 'Hot Desk'),
    ]
    name = models.CharField(max_length=100)
    description = models.TextField()
    workspace_type = models.CharField(max_length=20, choices=WORKSPAACE_TYPES)
    capacity = models.IntegerField()
    location = models.CharField(max_length=200)
    price_per_hour = models.DecimalField(max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name} ({self.workspace_type}) - {self.location}'