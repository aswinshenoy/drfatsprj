import React from "react";
import JobsView, { FilterTypeData, DepartmentType } from "@/app/JobsView";
import Fetch from "@/app/utils/fetch";
import {JobListType} from "@/app/JobsView/job-card";


type HomePageParams = {
  searchParams: {
    keyword?: string;
    location?: string;
    department?: string;
    workplaceModel?: string;
    workType?: string;
  }
};

const HomePage = async ({ searchParams }: HomePageParams) => {

  const locations: FilterTypeData[] = await Fetch("/api/locations", true).then(({ data }) => data?.results);
  const departments: DepartmentType[] = await Fetch("/api/departments", true).then(({ data }) => data?.results);
  const workplaceModels: FilterTypeData[] = await Fetch("/api/workplace-models", true).then(({ data }) => data);
  const workTypes: FilterTypeData[] = await Fetch("/api/worktypes", true).then(({ data }) => data);

  const getQuery = () => {
    const query = new URLSearchParams();
    if(searchParams.keyword)
      query.set("keyword", searchParams.keyword);
    if(searchParams.department)
      query.set("department", searchParams.department);
    if(searchParams.location)
      query.set("location", searchParams.location);
    if(searchParams.workType)
      query.set("workType", searchParams.workType);
    if(searchParams.workplaceModel)
      query.set("workplaceModel", searchParams.workplaceModel);
    return query.toString();
  }

  const jobs: JobListType[] = await Fetch(
    `/api/jobs?${getQuery()}`,
    true
  ).then(({ data }) => data);

  return (
      <JobsView
        filters={{
          keyword: searchParams.keyword,
          location: searchParams.location,
          department: searchParams.department,
          workplaceModel: searchParams.workplaceModel,
          workType: searchParams.workType
        }}
        jobs={jobs}
        departments={departments}
        locations={locations}
        workplaceModels={workplaceModels}
        workTypes={workTypes}
      />
  );

}


export default HomePage;