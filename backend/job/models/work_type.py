from django.db import models


class WorkType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        db_table = 'work_types'
        verbose_name = 'Work Type'
        verbose_name_plural = 'Work Types'

    def __str__(self):
        return self.name


__all__ = [
    'WorkType'
]
