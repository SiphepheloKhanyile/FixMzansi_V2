from django.db import models
from users.models import CustomUser


class Issue(models.Model):
    """
    Issue Model
    """
    ISSUE_CATEGORIES = [
        ('INF', 'Infrastructure'),
        ('ENV', 'Environmental'),
        ('SAF', 'Safety'),
        ('SOC', 'Social'),
        ('ECO', 'Economic'),
        ('EDU', 'Educational'),
        ('HEA', 'Health'),
        ('OTH', 'Other'),
    ]

    STATUS_CHOICES = [
        ('P', 'Pending'),
        ('R', 'Resolved'),
        ('D', 'Duplicate'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    street_name = models.CharField(max_length=255, blank=True, null=True)
    city_name = models.CharField(max_length=255, blank=True, null=True)
    town_name = models.CharField(max_length=255, blank=True, null=True)
    suburb_name = models.CharField(max_length=255)
    municipality = models.CharField(max_length=255)
    state_name = models.CharField(max_length=100)
    address_type = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=20, decimal_places=15)
    longitude = models.DecimalField(max_digits=20, decimal_places=15)
    date_posted = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    posted_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    category = models.CharField(
        max_length=3, choices=ISSUE_CATEGORIES, default='OTH')
    status = models.CharField(
        max_length=1, choices=STATUS_CHOICES, default='P')

    def __str__(self):
        return self.title


class Comment(models.Model):
    """
    Issue Comments Model
    """
    content = models.TextField()
    issue = models.ForeignKey(
        Issue, on_delete=models.CASCADE, related_name='comments')
    posted_by = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='comments')
    posted_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.posted_by.username}'s comment on {self.issue.title}"


class Upvote(models.Model):
    """
    Issue Upvotes Model
    """
    issue = models.ForeignKey(
        Issue, on_delete=models.CASCADE, related_name='upvotes')
    voted_by = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='upvotes')

    class Meta:
        unique_together = ('issue', 'voted_by',)

    def __str__(self):
        return f"{self.voted_by.username}'s upvote on {self.issue.title}"


class Downvote(models.Model):
    """
    Issue Downvotes Model
    """
    issue = models.ForeignKey(
        Issue, on_delete=models.CASCADE, related_name='downvotes')
    voted_by = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='downvotes')

    class Meta:
        unique_together = ('issue', 'voted_by',)

    def __str__(self):
        return f"{self.voted_by.username}'s downvote on {self.issue.title}"



class MediaContent(models.Model):
    """
    Issue Media Content Model
    """
    issue = models.ForeignKey(
        Issue, on_delete=models.CASCADE, related_name='media_contents')
    file = models.FileField(upload_to='issue_media/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Media for {self.issue.title} uploaded at {self.uploaded_at}"

