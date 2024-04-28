from django.contrib import admin
from .models import Candidate, Application


@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    search_fields = ['firstName', 'lastName', 'email', 'phone']
    list_display = ['firstName', 'lastName', 'email']


@admin.register(Application)
class Application(admin.ModelAdmin):
    search_fields = ['candidate', 'job']
    list_display = ['candidate', 'job', 'status']
    list_filter = ['status']
    autocomplete_fields = ['candidate', 'job']
