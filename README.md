# ATS Platform - Assignment Work

This repository contains the assignment work for the ATS Platform.

### Repository Structure

- `/backend` - Django backend serving REST APIs
- `/fontend` - NextJS React frontend for the ATS platform
- `/certbot` - to issue SSL cert on deployment
- `/nginx` - nginx to configure reverse proxy on deployment

### How to Run?

1. Clone the Repo
2. For Backend -
   - install packages with `pip install -r requirements.txt` inside a virtualenv
   - setup postgres db, and set the `.env` file (refer `sample.env`)
   - migrate the db - `python manage.py migrate`
   - populate the db with data - `python manage.py populate`
   - run the server - `python manage.py runserver`
   - The server will run at `:8000` and all paths are prefixed by `/api`
3. For Frontend -
   - install packages using `npm install`
   - run the application - `npm run dev`
   - The application will run at `:3000`
4. Setup a reverse proxy for localhost such that `/api` points to `:8000/api`, and `/` to `:3000`

### Backend APIs

- GET `/api/applications` - get all applications, paginated
  - query params - `keyword`, `minSalaryExpected`, `maxSalaryExpected`, `minAge`, `maxAge`, `minExperience`, `maxExperience`

- POST `/api/application/<id>/status` - update the status of an application
  - body - `status` to either 0 (rejected) or 1 (accepted) or 9 (unset)

- POST `/api/application` - create a new application
  - body - `job` (id as int/str), `candidate` (`Candidate` data), `formData` (json)

   
### License

This is not an open-source project, and hence no license is provided. Any unauthorized use of this project, including 
but not limited to copying, modifying, or distributing the source code, under any circumstances, is strictly prohibited. 

(c) 2024 Ashwin S Shenoy. All Rights Reserved.