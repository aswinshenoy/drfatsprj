from django.utils import timezone
from faker import Faker
from django.core.management.base import BaseCommand

from job.utils.data.jobs import JOBS
from job.models import Location, Department, Job, WorkType, WorkplaceModel, ExperienceLevel, Skill
from application.models import Application, Candidate

LOCATIONS = [
    'Bengaluru', 'Goa', 'Hyderabad', 'Delhi', 'Chennai', 'Kochi'
]

PARENT_DEPARTMENTS = [
    'Engineering',
    'Sales',
    'Marketing',
    'HR'
]

WORKPLACE_MODELS = [
    'Remote', 'Onsite', 'Hybrid'
]

WORK_TYPES = [
    'Full-time', 'Part-time', 'Contract', 'Internship'
]

SKILLS = [
    'Python', 'Typescript', 'Javascript', 'React', 'Angular', 'Vue', 'Django', 'Flask', 'Express', 'Node', 'MongoDB',
    'PostgreSQL', 'MySQL', 'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Jira', 'Slack', 'Agile',
    'Scrum', 'Kanban', 'Trello', 'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator', 'InDesign', 'After Effects',
    'Premiere Pro', 'Final Cut Pro', 'SEO', 'SEM', 'Google Analytics', 'Google Ads', 'Facebook Ads', 'Instagram Ads',
    'LinkedIn Ads', 'Twitter Ads', 'TikTok Ads', 'Snapchat Ads', 'Pinterest Ads', 'Reddit Ads', 'Email Marketing',
    'Content Marketing', 'Influencer Marketing', 'Affiliate Marketing', 'SEO Copywriting', 'UX Writing', 'UI Design',
    'UX Design', 'Product Design', 'Graphic Design', 'Motion Design', '3D Design', 'Illustration', 'Animation',
    'Videography', 'Photography', 'Video Editing', 'Photo Editing', 'Color Grading', 'Sound Design', 'Music Production',
    'Voiceover', 'Podcasting', 'Copywriting', 'Content Writing', 'Technical Writing', 'Blogging', 'Journalism', 'PR',
    'Editing', 'Proofreading', 'Transcription', 'Translation', 'Localization', 'Subtitling', 'Voice Acting', 'Acting',
    'Modeling', 'Dancing', 'Singing', 'Music Composition', 'Music Performance', 'Music Theory', 'Music History',
    'Sales', 'Business Development', 'Customer Success', 'Account Management', 'Client Services', 'Customer Support',
    'Customer Service', 'Technical Support', 'Product Management', 'Project Management', 'Program Management',
    'Product Marketing', 'Brand Marketing', 'Growth Marketing', 'Performance Marketing', 'Digital Marketing',
    'Social Media Marketing', 'Search Engine Marketing', 'Search Engine Optimization', 'Email Marketing',
    'Content Marketing', 'Inbound Marketing', 'Outbound Marketing', 'Affiliate Marketing', 'Influencer Marketing',
    'Community Management', 'Public Relations', 'Media Relations', 'Crisis Communications', 'Internal Communications',
    'Corporate Communications', 'Government Relations', 'Investor Relations', 'Analyst Relations', 'Public Affairs',
    'Content Strategy', 'Content Creation', 'Content Management', 'Content Planning', 'Content Production',
    'Content Optimization', 'Content Distribution', 'Content Promotion', 'Content Analysis', 'Content Reporting',
    'Content Governance', 'Content Operations', 'Content Design', 'Content Development', 'Content Writing',
    'Content Editing', 'Content Proofreading', 'Content Translation', 'Content Localization', 'Content Transcreation',
    'Content Adaptation', 'Content Curation', 'Content Aggregation', 'Content Syndication', 'Content Licensing',
    'Lead Generation', 'Lead Nurturing', 'Lead Scoring', 'Lead Qualification', 'Lead Conversion', 'Lead Management',
    'Landing Page Optimization', 'Landing Page Design', 'Landing Page Development', 'Landing Page Testing',
    'Law', 'Legal', 'Regulatory', 'Compliance', 'Ethics', 'Privacy', 'Data Protection', 'Data Privacy', 'GDPR',
    'CCPA', 'HIPAA', 'PCI DSS', 'SOX', 'FERPA', 'COPPA', 'GLBA', 'FISMA', 'NIST', 'ISO', 'IEC', 'PCI', 'CIS',
]

EXPERIENCE_LEVELS = [
    {
        "name": "Fresher",
        "min_years": 0,
        "max_years": 0
    },
    {
        "name": "Entry Level",
        "min_years": 0,
        "max_years": 2
    },
    {
        "name": "Mid Level",
        "min_years": 2,
        "max_years": 5
    },
    {
        "name": "Senior Level",
        "min_years": 5,
    }
]

DEPARTMENTS = [
    ('Frontend', 'Engineering'),
    ('Backend', 'Engineering'),
    ('Cloud Operations', 'Engineering'),
    ('Product Management', 'Engineering'),
    ('Design', 'Engineering'),
    ('Customer Success', 'Sales'),
    ('Business Development', 'Sales'),
    ('Content Marketing', 'Marketing'),
    ('Product Marketing', 'Marketing'),
    ('Recruitment', 'HR'),
    ('Training', 'HR'),
    ('Employee Relations', 'HR')
]


class Command(BaseCommand):
    help = 'Populate the database with dummy data'

    def handle(self, *args, **kwargs):

        locations = []
        for location in LOCATIONS:
            locations.append(Location(name=location))
        Location.objects.bulk_create(locations)

        parents = {}
        for department in PARENT_DEPARTMENTS:
            dept = Department.objects.create(name=department)
            parents[department] = dept

        depts = []
        for department in DEPARTMENTS:
            depts.append(
                Department(
                    name=department[0],
                    parent=parents[department[1]] if department[1] else None
                )
            )

        Department.objects.bulk_create(depts)

        workplace_models = []
        for model in WORKPLACE_MODELS:
            workplace_models.append(WorkplaceModel(name=model))
        WorkplaceModel.objects.bulk_create(workplace_models)

        work_types = []
        for work_type in WORK_TYPES:
            work_types.append(WorkType(name=work_type))
        WorkType.objects.bulk_create(work_types)

        experience_levels = []
        for level in EXPERIENCE_LEVELS:
            experience_levels.append(ExperienceLevel(**level))
        ExperienceLevel.objects.bulk_create(experience_levels)

        skills = []
        skillNames = []
        for skill in SKILLS:
            if skill not in skillNames:
                skillNames.append(skill)
                skills.append(Skill(name=skill))
        Skill.objects.bulk_create(skills)

        fake = Faker()

        jobs = []
        for job in JOBS:
            j = Job(
                title=job['title'],
                description=job['description'],
                department=Department.objects.get(name=job['department']) if job.get('department') else None,
                workType=WorkType.objects.get(name=job['workType']) if job.get('workType') else None,
                minExperienceYears=job.get('minExperienceYears', None) if 'minExperienceYears' in job else None,
                idealExperienceYears=job.get('idealExperienceYears', None) if 'idealExperienceYears' in job else None,
                formSections=job.get('formSections', None) if 'formSections' in job else dict,
                salaryInformation=job.get('salaryInformation', 0) if 'salaryInformation' in job else 0,
                _minSalary=job.get('_minSalary', None) if '_minSalary' in job else None,
                _maxSalary=job.get('_maxSalary', None) if '_maxSalary' in job else None,
                salaryTimeframe=job.get('salaryTimeframe', 'YEARLY') if 'salaryTimeframe' in job else 'YEARLY',
                salaryCurrency=job.get('salaryCurrency', 'USD') if 'salaryCurrency' in job else 'USD',
                timestampPosted=timezone.now() - timezone.timedelta(days=fake.random_int(0, 30), hours=fake.random_int(0, 23), minutes=fake.random_int(0, 59))
            )
            j.save()
            if 'locations' in job and job['locations']:
                j.locations.set(
                    Location.objects.filter(name__in=job['locations'])
                )
            if 'workplaceModels' in job and job['workplaceModels']:
                j.workplaceModels.set(
                    WorkplaceModel.objects.filter(name__in=job['workplaceModels'])
                )
            if 'skills' in job and job['skills']:
                j.skills.set(
                    Skill.objects.filter(name__iregex=r'(' + '|'.join(job['skills']) + ')')
                )
            jobs.append(j)

        for j in jobs:
            applicationsToCreate = fake.random_int(0, 25)
            for _ in range(applicationsToCreate):
                candidate = Candidate.objects.create(
                    firstName=fake.first_name(),
                    lastName=fake.last_name(),
                    email=fake.email(),
                    phone=fake.phone_number(),
                    dateOfBirth=fake.date_of_birth(),
                    monthsOfExperience=fake.random_int(0, 120),
                    currentLocation=fake.city(),
                    currentCompany=fake.company(),
                    currentSalary=fake.random_int(10000, 1000000),
                    expectedSalary=fake.random_int(10000, 1000000),
                    gender=fake.random_element(elements=[0, 1, 2, 9])
                )
                candidate.skills.set(
                    Skill.objects.order_by('?')[:fake.random_int(1, 5)]
                )
                data = {}
                for section in j.formSections:
                    for field in section["questions"]:
                        if field["type"] == "TEXT":
                            data[field["id"]] = fake.text()
                        elif field["type"] == "NUMBER":
                            data[field["id"]] = fake.random_int(0, 100)
                        elif field["type"] == "TEXTAREA":
                            data[field["id"]] = fake.paragraph()
                        elif field["type"] == "RADIO" or field["type"] == "CHECKBOX":
                            data[field["id"]] = field["options"][0]

                Application.objects.create(
                    candidate=candidate,
                    job=j,
                    formData=data
                )

        profiles = [
            {"firstName": "Ajay", "lastName": "Kumar Yadav"},
            {"firstName": "Ajay", "lastName": "Yadav"},
            {"firstName": "Ajay", "lastName": "Kumar"},
            {"firstName": "Ramesh", "lastName": "Yadav"},
            {"firstName": "Ajay", "lastName": "Singh"},
            {"firstName": "Kumar", "lastName": "Yadav"},
        ]
        for profile in profiles:
            candidate = Candidate.objects.create(
                firstName=profile["firstName"],
                lastName=profile["lastName"],
                email=fake.email(),
                phone=fake.phone_number(),
                dateOfBirth=fake.date_of_birth(),
                monthsOfExperience=fake.random_int(0, 120),
                currentLocation=fake.city(),
                currentCompany=fake.company(),
                currentSalary=fake.random_int(10000, 1000000),
                expectedSalary=fake.random_int(10000, 1000000),
            )
            candidate.skills.set(
                Skill.objects.order_by('?')[:fake.random_int(1, 5)]
            )
            data = {}
            for section in j.formSections:
                for field in section["questions"]:
                    if field["type"] == "TEXT":
                        data[field["id"]] = fake.text()
                    elif field["type"] == "NUMBER":
                        data[field["id"]] = fake.random_int(0, 100)
                    elif field["type"] == "TEXTAREA":
                        data[field["id"]] = fake.paragraph()
                    elif field["type"] == "RADIO" or field["type"] == "CHECKBOX":
                        data[field["id"]] = field["options"][0]

            Application.objects.create(
                candidate=candidate,
                job=j,
                formData=data
            )

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with dummy data'))


__all__ = [
    'Command'
]