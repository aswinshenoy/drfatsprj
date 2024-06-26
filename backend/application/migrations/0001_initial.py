# Generated by Django 4.2.11 on 2024-04-28 14:04

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('job', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Candidate',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('firstName', models.CharField(max_length=255)),
                ('lastName', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=30)),
                ('gender', models.PositiveSmallIntegerField(choices=[(0, 'Unknown'), (1, 'Male'), (2, 'Female'), (9, 'Not Applicable')], default=0)),
                ('dateOfBirth', models.DateField(blank=True, null=True)),
                ('monthsOfExperience', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('currentLocation', models.CharField(blank=True, max_length=100, null=True)),
                ('currentCompany', models.CharField(blank=True, max_length=100, null=True)),
                ('resumePath', models.CharField(blank=True, max_length=255, null=True)),
                ('currentSalary', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('expectedSalary', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('skills', models.ManyToManyField(blank=True, related_name='candidates', to='job.skill')),
            ],
            options={
                'verbose_name': 'Candidate',
                'verbose_name_plural': 'Candidates',
                'db_table': 'candidates',
            },
        ),
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('status', models.PositiveSmallIntegerField(choices=[(0, 'Rejected'), (1, 'Accepted'), (9, 'Applied')], default=9)),
                ('formData', models.JSONField(default=dict)),
                ('timestampApplied', models.DateTimeField(default=django.utils.timezone.now)),
                ('timestampStatusUpdated', models.DateTimeField(blank=True, null=True)),
                ('candidate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='application.candidate')),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='job.job')),
            ],
            options={
                'verbose_name': 'Application',
                'verbose_name_plural': 'Applications',
                'db_table': 'applications',
            },
        ),
    ]
