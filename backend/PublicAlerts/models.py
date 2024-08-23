from django.db import models
from users.models import CustomUser

class PublicAlerts(models.Model):
    """
    Alerts Model
    """
    title = models.CharField(max_length=255)
    description = models.TextField()
    posted_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                                  related_name='alerts', limit_choices_to={'user_type': 'MU'})
    posted_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
