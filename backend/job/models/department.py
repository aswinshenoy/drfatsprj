from django.db import models


class Department(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True, blank=True
    )

    @property
    def hasJobs(self) -> bool:
        return self.jobs.exists()

    class Meta:
        db_table = 'departments'
        verbose_name = 'Department'
        verbose_name_plural = 'Departments'

    def __str__(self):
        return self.name


__all__ = [
    'Department'
]
