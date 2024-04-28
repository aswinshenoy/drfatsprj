import React from "react";
import Fetch from "@/app/utils/fetch";
import ApplicationsFilter from "@/app/admin/applications/filters";
import ApplicationCard from "@/app/admin/applications/ApplicationCard";

type ApplicationsParams = {
  searchParams: {
    keyword?: string;
    minSalaryExpected?: string
    maxSalaryExpected: string,
    minExperience?: string,
    maxExperience?: string,
    minAge?: string,
    maxAge?: string,

  }
};

const ApplicationsPage = async ({ searchParams }: ApplicationsParams) => {

  const getQuery = () => {
    const query = new URLSearchParams();
    if(searchParams.keyword)
      query.set("keyword", searchParams.keyword);
    if(searchParams.minSalaryExpected)
      query.set("minSalaryExpected", searchParams.minSalaryExpected);
    if(searchParams.maxSalaryExpected)
      query.set("maxSalaryExpected", searchParams.maxSalaryExpected);
    if(searchParams.minExperience)
      query.set("minExperience", searchParams.minExperience);
    if(searchParams.maxExperience)
      query.set("maxExperience", searchParams.maxExperience);
    if(searchParams.minAge)
      query.set("minAge", searchParams.minAge);
    if(searchParams.maxAge)
      query.set("maxAge", searchParams.maxAge);
    return query.toString();
  }

  const applications = await Fetch(
    `/api/applications?${getQuery()}`,
    true
  ).then(({ data }) => data?.results);

  return (
    <div className="container mx-auto max-w-[720px] flex flex-col gap-4 p-4">
      <h1 className="text-2xl my-4 font-semibold">Applications</h1>
      <ApplicationsFilter />
      <div className="flex flex-col gap-3">
        {applications?.length > 0 ?
         applications.map((application: any, index: number) => (
            <ApplicationCard key={application?.id} application={application} index={index} />
          )) : (
            <div className="h-[25vh] p-6">
              <div>
                Applications not found
              </div>
            </div>
          )}
      </div>
    </div>
  )

};

export default ApplicationsPage;