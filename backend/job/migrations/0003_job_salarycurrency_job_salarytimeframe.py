# Generated by Django 4.2.11 on 2024-04-29 21:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0002_job__maxsalary_job__minsalary_job_salaryinformation_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='salaryCurrency',
            field=models.CharField(default='USD', max_length=5),
        ),
        migrations.AddField(
            model_name='job',
            name='salaryTimeframe',
            field=models.CharField(choices=[('HOURLY', 'Hourly'), ('DAILY', 'Daily'), ('WEEKLY', 'Weekly'), ('MONTHLY', 'Monthly'), ('YEARLY', 'Yearly')], default='YEARLY', max_length=10),
        ),
    ]
