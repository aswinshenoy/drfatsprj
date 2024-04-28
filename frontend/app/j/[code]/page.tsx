import React from "react";
import {notFound} from "next/navigation";

import Fetch from "@/app/utils/fetch";
import JobHeader from "@/app/j/[code]/header";
import ContentView from "@/app/j/[code]/content";
import {JobFetchType} from "@/app/j/[code]/types";

export const generateMetadata = async ({ params }: { params: { code: string } }) => {
  const {
    data: job,
    error: _error
  }: JobFetchType = await Fetch(`/api/job/${params.code}`)
  if(_error || !job)
    return {
      title: 'Job not found',
      robots: {
        noindex: true
      }
    };
  return {
    title: job.title,
    description: job.description,
    openGraph: {
      title: job.title,
      description: job.description,
    }
  };
}

const JobPage = async ({ params }: { params: { code: string } }) => {

  const {
    data: job,
    error: _error
  }: JobFetchType = await Fetch(`/api/job/${params.code}`)
  if(_error || !job)
    return notFound();

  return (
    <div className="flex flex-col min-h-[100vh] justify-between gap-2">
      <section className="container max-w-[1000px] mx-auto">
        <JobHeader job={job}/>
      </section>
      <section className="flex flex-col min-h-[50vh] justify-between gap-2">
        <ContentView job={job} />
      </section>
    </div>
  );


};

export default JobPage;