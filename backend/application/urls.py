from django.urls import path
from application import views

urlpatterns = [
    path('candidates/', views.candidates_api),
    path('candidate/<int:pk>/', views.candidate_api),
    path('applications/', views.ApplicationsAPI.as_view()),
    path('submit-application/', views.submit_application),
    path('applications/<int:id>/status', views.update_application_status),
]
