from django.contrib import admin

from .models import Department, Location, Job, WorkplaceModel, WorkType, ExperienceLevel


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    search_fields = ['title']
    autocomplete_fields = ['locations', 'department', 'workType', 'workplaceModels']


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    search_fields = ['name']


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    search_fields = ['name']


@admin.register(WorkplaceModel)
class WorkplaceModelAdmin(admin.ModelAdmin):
    search_fields = ['name']


@admin.register(WorkType)
class WorkTypeAdmin(admin.ModelAdmin):
    search_fields = ['name']


@admin.register(ExperienceLevel)
class ExperienceLevelAdmin(admin.ModelAdmin):
    search_fields = ['name']


