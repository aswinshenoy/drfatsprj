from django.db import models


class ExperienceLevel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)

    min_years = models.PositiveSmallIntegerField()
    max_years = models.PositiveSmallIntegerField(null=True, blank=True)

    class Meta:
        db_table = 'experience_levels'
        verbose_name = 'Experience Level'
        verbose_name_plural = 'Experience Levels'

    def __str__(self):
        return self.name


__all__ = [
    'ExperienceLevel'
]
