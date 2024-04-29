from django.db import models
from django.utils import timezone


class Application(models.Model):
    id = models.AutoField(primary_key=True)

    candidate = models.ForeignKey(
        'Candidate',
        on_delete=models.CASCADE
    )
    job = models.ForeignKey(
        'job.Job',
        on_delete=models.CASCADE
    )

    status = models.PositiveSmallIntegerField(
        choices=[
            (0, 'Rejected'),
            (1, 'Accepted'),
            (9, 'Applied'),
        ],
        default=9,
    )

    formData = models.JSONField(
        default=dict,
    )

    timestampApplied = models.DateTimeField(default=timezone.now)
    timestampStatusUpdated = models.DateTimeField(null=True, blank=True)

    source = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        db_table = 'applications'
        verbose_name = 'Application'
        verbose_name_plural = 'Applications'

    def __str__(self):
        return f'{self.candidate} - {self.job}'


__all__ = [
    'Application'
]
