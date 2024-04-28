from django.db import models
from django.utils import timezone


class Job(models.Model):
    id = models.AutoField(primary_key=True)
    jobID = models.CharField(max_length=255, blank=True, unique=True)

    title = models.CharField(max_length=255)
    description = models.TextField()

    locations = models.ManyToManyField(
        'Location',
        related_name='jobs',
        blank=True
    )
    workplaceModels = models.ManyToManyField(
        'WorkplaceModel',
        related_name='jobs',
        blank=True
    )

    department = models.ForeignKey(
        'Department',
        on_delete=models.CASCADE,
        related_name='jobs'
    )

    workType = models.ForeignKey(
        'WorkType',
        on_delete=models.CASCADE,
        related_name='jobs',
        null=True, blank=True
    )

    minExperienceYears = models.PositiveIntegerField(null=True, blank=True)
    idealExperienceYears = models.PositiveIntegerField(null=True, blank=True)

    skills = models.ManyToManyField(
        'Skill',
        related_name='jobs',
        blank=True
    )

    formSections = models.JSONField(default=dict)

    timestampPosted = models.DateTimeField(default=timezone.now)

    def _set_jobID(self):
        from uuid import uuid4
        self.jobID = str(uuid4())

    def save(self, *args, **kwargs):
        if not self.jobID:
            self._set_jobID()
        super(Job, self).save(*args, **kwargs)

    class Meta:
        db_table = 'jobs'
        verbose_name = 'Job'
        verbose_name_plural = 'Jobs'

    def __str__(self):
        return self.title


__all__ = [
    'Job'
]
