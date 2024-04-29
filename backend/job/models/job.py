from django.db import models
from typing import Optional


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

    salaryInformation = models.PositiveSmallIntegerField(
        choices=[
            (0, 'Hidden'),
            (1, 'Fixed'),
            (2, 'Range')
        ],
        default=0
    )
    # _minSalary is considered as the fixed Salary, when salaryInformation is 1 (Fixed)
    _minSalary = models.PositiveIntegerField(null=True, blank=True)
    _maxSalary = models.PositiveIntegerField(null=True, blank=True)
    salaryTimeframe = models.CharField(
        max_length=10,
        choices=[
            ('HOURLY', 'Hourly'),
            ('DAILY', 'Daily'),
            ('WEEKLY', 'Weekly'),
            ('MONTHLY', 'Monthly'),
            ('YEARLY', 'Yearly')
        ],
        default='YEARLY'
    )
    salaryCurrency = models.CharField(
        max_length=5,
        default='USD'
    )

    minExperienceYears = models.PositiveIntegerField(null=True, blank=True)
    idealExperienceYears = models.PositiveIntegerField(null=True, blank=True)

    skills = models.ManyToManyField(
        'Skill',
        related_name='jobs',
        blank=True
    )

    formSections = models.JSONField(default=dict)

    # when timestampPosted is not set, the job is not visible on the job board or with links
    timestampPosted = models.DateTimeField(null=True, blank=True)
    # when timestampClosed is set, the job is closed for applications, but still visible on the job board or with links
    timestampClosed = models.DateTimeField(null=True, blank=True)
    # when timestampArchived is set, the job is archived and not visible on the job board or with links
    timestampArchived = models.DateTimeField(null=True, blank=True)

    @property
    def isAcceptingApplications(self) -> bool:
        return (
            self.timestampPosted is not None
            and self.timestampClosed is None
            and self.timestampArchived is None
        )

    @property
    def minSalary(self) -> Optional[int]:
        if self.salaryInformation > 0:
            return self._minSalary

    @property
    def maxSalary(self) -> Optional[int]:
        if self.salaryInformation == 2:
            return self._maxSalary
        return self.minSalary

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
