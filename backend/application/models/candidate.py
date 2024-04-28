from django.db import models


class Candidate(models.Model):
    id = models.AutoField(primary_key=True)

    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=30)

    gender = models.PositiveSmallIntegerField(
        choices=[
            (0, 'Unknown'),
            (1, 'Male'),
            (2, 'Female'),
            (9, 'Not Applicable')
        ],
        default=0,
    )

    dateOfBirth = models.DateField(null=True, blank=True)
    monthsOfExperience = models.PositiveSmallIntegerField(null=True, blank=True)

    currentLocation = models.CharField(max_length=100, null=True, blank=True)
    currentCompany = models.CharField(max_length=100, null=True, blank=True)

    resumePath = models.CharField(max_length=255, null=True, blank=True)

    currentSalary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    expectedSalary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    skills = models.ManyToManyField(
        'job.Skill',
        related_name='candidates',
        blank=True
    )

    class Meta:
        db_table = 'candidates'
        verbose_name = 'Candidate'
        verbose_name_plural = 'Candidates'

    def __str__(self):
        return f'{self.firstName} {self.lastName}'


__all__ = [
    'Candidate'
]
