from django.contrib import admin
from .models import Issue, Comment, Upvote, Downvote, MediaContent

admin.site.register(Issue)
admin.site.register([Comment, Upvote, Downvote, MediaContent])

