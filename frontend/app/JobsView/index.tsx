'use client';
import React from "react";
import {Button} from "chaya-ui";
import {usePathname, useRouter} from "next/navigation";

import JobCard, { JobListType } from "./job-card";
import JobViewFilter, { JobFilterType } from "@/app/JobsView/filters";

export type FilterTypeData = {
  name: string
  id: string
};

export type DepartmentType = {
  name: string
  id: string
  parent: string | null
  hasJobs: boolean
};


const JobsView = ({ jobs, locations, departments, workplaceModels, workTypes, filters }: {
  jobs: JobListType[]
  locations: FilterTypeData[]
  departments: DepartmentType[]
  workplaceModels: FilterTypeData[]
  workTypes: FilterTypeData[],
  filters: JobFilterType
}) => {

  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="container max-w-[900px] mx-auto">
      <div className="flex flex-col gap-2">
        <div className="pt-4 pb-2">
          <JobViewFilter
            locations={locations}
            departments={departments}
            workplaceModels={workplaceModels}
            workTypes={workTypes}
            filters={filters}
          />
        </div>
        {jobs && jobs.length > 0 ? departments.filter((department) =>
          department.parent === null &&
          departments.filter((d) =>
            d.parent == department.id && d.hasJobs
            && jobs.filter((j) => j.department.id === d.id).length
          ).length

        ).map((department) => (
          <div key={department.id} className="flex flex-col gap-3 py-4 px-2">
            <h2 className="text-xl md:text-2xl font-semibold uppercase">
              {department.name}
            </h2>
            <hr/>
            <div className="flex flex-col gap-2">
              {departments.filter((subDepartment) =>
                subDepartment.parent === department.id
                && subDepartment.hasJobs
                && jobs.filter((j) => j.department.id == subDepartment.id).length
              ).map((subDepartment) => (
                <div key={subDepartment.id} className="flex flex-col w-full gap-0 px-2 py-5">
                  <h3 className="text-lg md:text-xl font-semibold py-1 mb-3 opacity-70">
                    {subDepartment.name}
                  </h3>
                  {jobs && jobs?.length > 0 ?
                    jobs.filter((job) => job.department.id === subDepartment.id).map((job, index) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        firstCard={index === 0}
                        lastCard={index === jobs.filter((job) => job.department.id === subDepartment.id).length - 1}
                      />
                    )) : null}
                </div>
              ))}
            </div>
          </div>
        )) : (
          <div
            className="flex flex-col bg-gray-100 rounded-lg md:rounded-xl min-h-[50vh] justify-center items-center gap-3"
          >
            <h2 className="text-2xl md:text-3xl font-semibold">
              No Opportunities Found
            </h2>
            <p className="opacity-80">
              {`We couldn't find any opportunities matching your criteria.`}
            </p>
            <Button
              onClick={() => {
                const path = pathname.split('?')[0];
                router.push(path);
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );

};

export default JobsView;