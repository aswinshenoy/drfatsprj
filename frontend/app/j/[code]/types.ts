type FormFieldType = {
  id: string,
  label: string,
  type: 'TEXT' | 'TEXTAREA' | 'RADIO' | 'CHECKBOX' | 'LINK' | 'FILE' | 'VOICE'
  options: string[],
  placeholder: string,
  isRequired: boolean,
}

export type JobType = {
  id: string,
  title: string,
  jobID: string,
  description: string,
  timestampPosted: string,
  locations: {
    id: string,
    name: string
  }[],
  workplaceModels: {
    id: string,
    name: string,
  }[],
  department: {
    id: string,
    name: string,
    parent: number | null,
    hasJobs: boolean
  },
  workType: {
    id: string,
    name: string
  },
  skills: {
    id: string
    name: string
  }[],
  salaryInformation: 0 | 1 | 2,
  minSalary: number | null,
  maxSalary: number | null,
  minExperienceYears: number | null,
  idealExperienceYears: number | null,
  formSections: {
    title: string,
    description: string,
    questions: FormFieldType[]
  }[]
}

export type JobFetchType = {
  data: JobType | null
  error: string | null
}