
TECH_FIELDS = [
    {
        "title": "LINKS",
        "questions": [
            {
                "id": "linkedin",
                "label": "Linkedin",
                "isRequired": "true",
                "placeholder": "https://linkedin.com/in/<username>",
                "type": "LINK"
            },
            {
                "id": "github",
                "label": "GitHub",
                "placeholder": "https://github.com/<username>",
                "type": "LINK"
            },
            {
                "id": "website",
                "label": "Portfolio / Website ",
                "placeholder": "https://mywebsite.com",
                "type": "LINK"
            },
            {
                "id": "url",
                "label": "Other URL",
                "placeholder": "https://example.com",
                "type": "LINK"
            }
        ]
    }
]

FORM_FIELDS = [
    {
       "title": "Screening Questions",
       "questions": [
           {
               "id": "why-select-you",
               "label": "Why should we hire you?",
               "type": "VOICE"
           },
           {
               "id": "challenging-project",
               "label": "Tell us about a challenging project you worked on recently and how you overcame it.",
               "type": "VOICE"
           },
           {
                "id": "strength-weakness",
                "label": "What are your strengths and weaknesses?",
                "type": "VOICE"
           }
       ]
    },
    {
        "title": "Availability",
        "questions": [
            {
                "id": "join-date",
                "label": "If offered a position, how soon can you join?",
                "type": "TEXT"
            },
            {
                "id": "work-location",
                "label": "Are you able to work at our Office, atleast 3 times a week?",
                "type": "RADIO",
                "options": ["Yes", "No"]
            }
        ]
    },
    {
        "title": "Additional Information",
        "questions": [
            {
                "id": "additional-info",
                "label": "",
                "type": "TEXTAREA",
                "placeholder": "Add a cover letter or anything else you want to share"
            }
        ]
    }
]

JOBS = [
    {
      "title": "Frontend Intern",
      "minExperienceYears": 0,
      "department": "Frontend",
      "locations": ["Bengaluru"],
      "workType": "Internship",
      "workplaceModels": ["Onsite"],
        "salaryInformation": 1,
        "_minSalary": 100000,
      "skills": ["React", "HTML", "CSS", "JavaScript"],
        "formSections": [
            *TECH_FIELDS,
            *FORM_FIELDS
        ],
        "description": """
We are looking for a Frontend Engineer who is motivated to combine the art of design with the art of
programming. Responsibilities will include translation of the UI/UX design wireframes to actual code that
will produce visual elements of the application. You will work with the UI/UX designer and bridge the gap
between graphical design and technical implementation, taking an active role on both sides and defining
how the application looks as well as how it works.

## Responsibilities
- Develop new user-facing features
- Build reusable code and libraries for future use
- Ensure the technical feasibility of UI/UX designs
- Optimize application for maximum speed

## Skills
- Proficient understanding of web markup, including HTML5, CSS3

## Requirements
- B.Tech in Computer Science or equivalent

""",
    },
    {
        "title": "Frontend Engineer II",
        "minExperienceYears": 3,
        "department": "Frontend",
        "locations": ["Bengaluru", "Goa"],
        "workType": "Full-time",
        "workplaceModels": ["Remote", "Onsite"],
        "skills": ["React", "HTML", "CSS", "JavaScript"],
        "salaryInformation": 0,
        "_minSalary": 1500000,
        "_maxSalary": 2000000,
        "formSections": [
          *TECH_FIELDS,
          *FORM_FIELDS
        ],
        "description": """    
We are looking for a Frontend Engineer who is motivated to combine the art of design with the art of 
programming. Responsibilities will include translation of the UI/UX design wireframes to actual code that 
will produce visual elements of the application. You will work with the UI/UX designer and bridge the gap 
between graphical design and technical implementation, taking an active role on both sides and defining 
how the application looks as well as how it works.

## Responsibilities
- Develop new user-facing features
- Build reusable code and libraries for future use
- Ensure the technical feasibility of UI/UX designs
- Optimize application for maximum speed and scalability
- Assure that all user input is validated before submitting to back-end

## Skills
- Proficient understanding of web markup, including HTML5, CSS3
- Basic understanding of server-side CSS pre-processing platforms, such as LESS and SASS
- Proficient understanding of client-side scripting and JavaScript frameworks, including jQuery

## Requirements
- 3+ years of experience
- B.Tech in Computer Science or equivalent
- Strong understanding of JavaScript, its quirks, and workarounds

## Benefits
- Competitive salary
- Health insurance
- Free lunch
        """
    },
    {
        "title": "Backend Engineer III",
        "department": "Backend",
        "workType": "Full-time",
        "locations": ["Goa", "Bengaluru"],
        "workplaceModels": ["Remote"],
        "skills": ["Django", "Python", "AWS", "Docker"],
        "minExperienceYears": 5,
        "idealExperienceYears": 8,
        "salaryInformation": 2,
        "_minSalary": 2000000,
        "_maxSalary": 2500000,
        "formSections": [
          *TECH_FIELDS,
          *FORM_FIELDS
        ],
        "description": """
We are looking for a Backend Engineer who is motivated to combine the art of design with the art of 
programming. Responsibilities will include translation of the UI/UX design wireframes to actual code that 
will produce visual elements of the application. You will work with the UI/UX designer and bridge the gap 
between graphical design and technical implementation, taking an active role on both sides and defining 
how the application looks as well as how it works.

## Responsibilities
- Develop new user-facing features
- Build reusable code and libraries for future use
- Ensure the technical feasibility of UI/UX designs
- Optimize application for maximum speed and scalability
- Assure that all user input is validated before submitting to back-end

## Skills
- Proficient understanding of web markup, including HTML5, CSS3
- Basic understanding of server-side CSS pre-processing platforms, such as LESS and SASS
- Proficient understanding of client-side scripting and JavaScript frameworks, including jQuery

## Requirements
- 5+ years of experience
- B.Tech in Computer Science or equivalent
- Strong understanding of JavaScript, its quirks, and workarounds

## Benefits
- Competitive salary
- Health insurance
- Free lunch
        """,
    },
    {
        "title": "Business Development Manager",
        "minExperienceYears": 5,
        "idealExperienceYears": 8,
        "department": "Business Development",
        "locations": ["Bengaluru", "Goa"],
        "workType": "Full-time",
        "workplaceModels": ["Onsite"],
        "skills": ["Sales", "Marketing", "Business Development"],
        "formSections": [
          *TECH_FIELDS,
          *FORM_FIELDS
        ],
        "description": """            
We are looking for a Business Development Manager who is motivated to combine the art of design with the art of 
programming. Responsibilities will include translation of the UI/UX design wireframes to actual code that 
will produce visual elements of the application. You will work with the UI/UX designer and bridge the gap 
between graphical design and technical implementation, taking an active role on both sides and defining 
how the application looks as well as how it works.

## Responsibilities
- Develop new user-facing features
- Build reusable code and libraries for future use
- Ensure the technical feasibility of UI/UX designs
- Optimize application for maximum speed and scalability
- Assure that all user input is validated before submitting to back-end

## Skills
- Proficient understanding of web markup, including HTML5, CSS3
- Basic understanding of server-side CSS pre-processing platforms, such as LESS and SASS
- Proficient understanding of client-side scripting and JavaScript frameworks, including jQuery

## Requirements
- 5+ years of experience
- B.Tech in Computer Science or equivalent
- Strong understanding of JavaScript, its quirks, and workarounds

## Benefits
- Competitive salary
- Health insurance
- Free lunch
        """
    }
]

__all__ = [
    'JOBS'
]
