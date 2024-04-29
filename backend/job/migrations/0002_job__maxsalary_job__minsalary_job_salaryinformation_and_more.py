# Generated by Django 4.2.11 on 2024-04-29 04:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='_maxSalary',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='job',
            name='_minSalary',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='job',
            name='salaryInformation',
            field=models.PositiveSmallIntegerField(choices=[(0, 'Hidden'), (1, 'Fixed'), (2, 'Range')], default=0),
        ),
        migrations.AddField(
            model_name='job',
            name='timestampArchived',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='job',
            name='timestampClosed',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='timestampPosted',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
