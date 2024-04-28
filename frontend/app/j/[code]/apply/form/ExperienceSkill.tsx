import React from "react";
import {ApplicationDataType} from "./types";
import {TextInput} from "chaya-ui";

const ExperienceSkillForm = ({ data, setData }: {
  data: ApplicationDataType, setData: (data: ApplicationDataType) => void
}) => (
  <React.Fragment>
    <div className="flex rounded-lg md:rounded-xl md:p-4 lg:p-6 bg-white shadow-lg flex-wrap mx-0">
      <h3 className="w-full p-2 mb-4 text-lg md:text-xl opacity-80">
        <i className="ri-briefcase-line mr-2"/>
        Employment Information
      </h3>
      <div className="w-full md:w-1/2 p-2">
        <TextInput
          label="Current Company"
          name="current_company"
          placeholder="eg: Google"
          value={data?.currentCompany ?? ''}
          onChange={(currentCompany) => setData({...data, currentCompany})}
        />
      </div>
      <div className="w-full md:w-1/2 p-2">
        <TextInput
          label="Current Location"
          name="current_location"
          placeholder="eg: Bengaluru, India"
          value={data?.currentLocation ?? ''}
          onChange={(currentLocation) => setData({...data, currentLocation})}
        />
      </div>
      <div className="w-full p-2 my-3">
        <h4 className="opacity-60 font-semibold uppercase">
          Experience
        </h4>
      </div>
      <div className="w-full md:w-1/2 p-2">
        <TextInput
          label="Work Experience (Years)"
          name="experience_years"
          placeholder="eg: 1"
          value={data?.experienceYears ?? 0}
          type="number"
          onChange={(experienceYears) => setData({...data, experienceYears})}
        />
      </div>
      <div className="w-full md:w-1/2 p-2">
        <TextInput
          label="Work Experience (Months)"
          name="experience_months"
          placeholder="eg: 3"
          value={data?.experienceMonths ?? 0}
          type="number"
          onChange={(experienceMonths) => setData({...data, experienceMonths})}
        />
      </div>
      <div className="w-full p-2 my-3">
        <h4 className="opacity-60 font-semibold uppercase">
          Compensation
        </h4>
      </div>
      <div className="w-full md:w-1/2 p-2">
        <TextInput
          label="Current Salary"
          name="current_salary"
          placeholder="eg: 900000"
          type="number"
          value={data?.currentSalary ?? 0}
          onChange={(currentSalary: number) => setData({...data, currentSalary})}
          prefixRenderer={<span className="px-4">₹</span>}
          inputClassName="text-lg"
        />
      </div>
      <div className="w-full md:w-1/2 p-2">
        <TextInput
          label="Expected Salary"
          name="expected_salary"
          placeholder="eg: 900000"
          type="number"
          value={data?.expectedSalary ?? 0}
          onChange={(expectedSalary: number) => setData({...data, expectedSalary})}
          prefixRenderer={<span className="px-4">₹</span>}
          inputClassName="text-lg"
        />
      </div>
    </div>
    <div className="flex rounded-lg md:rounded-xl md:p-4 lg:p-6 bg-white shadow-lg flex-wrap mx-0">
      <h3 className="w-full p-2 mb-4 text-lg md:text-xl opacity-80">
        <i className="ri-tools-line mr-2"/>
        Your Skills
      </h3>

    </div>
  </React.Fragment>
);

export default ExperienceSkillForm;

