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
    workplaceType?: string;
  }
};

const HomePage = async ({ searchParams }: HomePageParams) => {

  const locations: FilterTypeData[] = await Fetch("/api/locations", true).then(({ data }) => data?.results);
  const departments: DepartmentType[] = await Fetch("/api/departments", true).then(({ data }) => data?.results);
  const workplaceModels: FilterTypeData[] = await Fetch("/api/workplace-models", true).then(({ data }) => data);
  const workplaceTypes: FilterTypeData[] = await Fetch("/api/worktypes", true).then(({ data }) => data);

  const getQuery = () => {
    const query = new URLSearchParams();
    if(searchParams.keyword)
      query.set("keyword", searchParams.keyword);
    if(searchParams.department)
      query.set("department", searchParams.department);
    if(searchParams.location)
      query.set("location", searchParams.location);
    return query.toString();
  }

  const jobs: JobListType[] = await Fetch(
    `/api/jobs?${getQuery()}`,
    true
  ).then(({ data }) => data);

  return (
      <JobsView
        jobs={jobs}
        departments={departments}
        locations={locations}
        workplaceModels={workplaceModels}
        workplaceTypes={workplaceTypes}
      />
  );

}


export default HomePage;