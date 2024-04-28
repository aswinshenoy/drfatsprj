from django.urls import path

from .views import (
    DepartmentsAPI,
    SkillsAPI,
    LocationsAPI,
    worktypes_api,
    workplace_models_api,
    jobs_api,
    job_api,
)

urlpatterns = [
    path('skills/', SkillsAPI.as_view()),
    path('departments/', DepartmentsAPI.as_view()),
    path('locations/', LocationsAPI.as_view()),

    path('worktypes/', worktypes_api),
    path('workplace-models/', workplace_models_api),
    path('jobs/', jobs_api),
    path('job/<str:jobID>', job_api),
]
