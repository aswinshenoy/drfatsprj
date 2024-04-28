'use client';
import React, {useState} from "react";
import { Button } from "chaya-ui";
import axios from "axios";

import {JobType} from "@/app/j/[code]/types";
import {ApplicationDataType} from "./types";
import ProfileForm from "@/app/j/[code]/apply/form/Profile";
import EmploymentInfoForm from "@/app/j/[code]/apply/form/ExperienceSkill";
import FormFields from "@/app/j/[code]/apply/form/form";
import ProfileImporter from "@/app/j/[code]/apply/form/importer";
import Stepper from "@/app/shared/Stepper";

const JobApplicationForm = ({ job }: { job: JobType }) => {

  const [data, setData] = useState<ApplicationDataType>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',

    currentCompany: null,
    currentLocation: null,
    currentSalary: null,
    expectedSalary: null,

    experienceMonths: null,
    experienceYears: null,

    resume: null,
    coverLetter: null,
    coverLetterText: '',
    formData: {}
  });

  const [currentScreen, setCurrentScreen] = useState('PROFILE_IMPORTER');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [application, setApplication] = useState<{
    id: string
  } | null>(null);

  const api = axios.create({
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if(nextScreen !== 'SUBMIT')
      setCurrentScreen(nextScreen);
    else {
      api.post(
        '/api/submit-application/',
        {
          job: job.id,
          candidate: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phoneNumber,
            currentCompany: data.currentCompany,
            currentLocation: data.currentLocation,
            currentSalary: data.currentSalary,
            expectedSalary: data.expectedSalary,
            monthsOfExperience: ((data.experienceYears ?? 0) * 12) + (data.experienceMonths ?? 0)
          },
          formData: data.formData
        }
      ).then(({ data }) => {
        setIsSubmitting(false);
        if(data) {
          setApplication(data);
        }
      })
    }
  };

  const nextScreen = (
    currentScreen === 'PROFILE' ? 'EMPLOYMENT_INFO'
      : currentScreen === 'EMPLOYMENT_INFO' && job.formSections?.length ? 'FORM_FIELDS'
      : 'SUBMIT'
  );

  const previousScreen = (
    currentScreen === 'EMPLOYMENT_INFO' ? 'PROFILE'
      : currentScreen === 'FORM_FIELDS' ? 'EMPLOYMENT_INFO'
      : 'PROFILE'
  );

  return (
    <div className="min-h-[75vh] py-6 md:py-8 bg-neutral-100">
      {application?.id ? (
        <div className="flex justify-center items-center min-h-[70vh] gap-4">
          <div className="flex flex-col gap-6">
            <div className="bg-white flex flex-col gap-4 p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl shadow-lg md:shadow-xl">
              <h1 className="text-xl md:text-2xl font-semibold">
                Application Submitted
              </h1>
              <p className="opacity-80">
                Your application has been submitted. Our team shall quickly get back to you.
              </p>
            </div>
          </div>
        </div>
      ) : isSubmitting ? (
        <div className="flex justify-center items-center min-h-[70vh] gap-4">
          <div className="flex flex-col gap-6">
            <div className="bg-white flex flex-col gap-4 p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl shadow-lg md:shadow-xl">
              <h1 className="text-xl md:text-2xl font-semibold">
                Submitting Your Application
              </h1>
              <p className="opacity-80">
                Please wait while we are submitting your application.
              </p>
            </div>
          </div>
        </div>
      ) : currentScreen === 'PROFILE_IMPORTER' ? (
        <div className="px-2">
          <ProfileImporter
            onFillManual={() => setCurrentScreen('PROFILE')}
          />
        </div>
      ) : (
        <form
          onSubmit={handleNext}
          className="flex flex-col gap-4 mx-auto container max-w-[900px]"
        >
          <div className="flex justify-center">
            <div className="w-[500px] px-4 max-w-full">
              <Stepper
                currentStepID={currentScreen}
                steps={[
                  { id: 'PROFILE', label: 'About' },
                  { id: 'EMPLOYMENT_INFO', label: 'Experience & Skill' },
                  { id: 'FORM_FIELDS', label: 'Questions', isHidden: !job.formSections?.length },
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 px-2 min-h-[50vh]">
            {currentScreen === 'PROFILE' ? (
              <ProfileForm data={data} setData={setData} />
            ) : currentScreen === 'EMPLOYMENT_INFO' ? (
              <EmploymentInfoForm data={data} setData={setData} />
            ) : currentScreen === 'FORM_FIELDS' ? (
              <FormFields job={job} data={data} setData={setData} />
            ) : <div />}
          </div>
          <div className="flex justify-between mt-4 px-2 gap-2 items-center mx-0">
            {currentScreen !== 'PROFILE' ? (
              <Button
                variant="minimal"
                color="secondary"
                key={previousScreen}
                type="button"
                size="lg"
                leftIcon="ri-arrow-left-line"
                onClick={() => setCurrentScreen(previousScreen)}
              >
                Back
              </Button>
            ) : <div className="hidden md:block" />}
            <Button
              key={nextScreen}
              size="lg"
              type="submit"
              className="w-full md:w-fit"
              rightIcon="ri-arrow-right-line"
            >
              {nextScreen === 'SUBMIT' ? 'Submit Application' : 'Next'}
            </Button>
          </div>
        </form>
      )}
      <div className="flex justify-center text-sm py-6 mt-8 opacity-60 text-center">
        <div>
          This site is protected by reCAPTCHA and the Google{' '}
          <a
            href={`https://policies.google.com/privacy`}
            target="_blank"
            rel="noreferrer"
            className="hover:underline hover:text-primary"
          >
            Privacy Policy
          </a>{` `}and{` `}
          <a
            href={`https://policies.google.com/privacy`}
            target="_blank"
            rel="noreferrer"
            className="hover:underline hover:text-primary"
          >
            Terms of Service
          </a>{` `}
          apply.
        </div>
      </div>
    </div>
);

};

export default JobApplicationForm;