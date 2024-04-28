import {VoiceData} from "@/app/shared/VoiceField";

export type ApplicationDataType = {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,

  currentCompany: string | null,
  currentLocation: string | null,

  currentSalary: number | null,
  expectedSalary: number | null,

  experienceMonths: number | null,
  experienceYears: number | null,

  resume: File | null,
  coverLetterText: string,
  coverLetter: File | null,
  formData: {
    [key: string]: string | string[] | VoiceData | null
  }
};