from django.db import models


class WorkplaceModel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        db_table = 'workplace_model'
        verbose_name = 'Workplace Model'
        verbose_name_plural = 'Workplace Models'

    def __str__(self):
        return self.name


__all__ = [
    'WorkplaceModel'
]
