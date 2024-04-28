import React from "react";
import {notFound} from "next/navigation";

import { JobFetchType } from "@/app/j/[code]/types";
import Fetch from "@/app/utils/fetch";

import ApplyJobHeader from "./header";
import JobApplicationForm from "./form";

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
    title: `Apply for ${job.title}`,
    description: job.description,
    openGraph: {
      title: job.title,
      description: job.description,
    }
  };
}

const ApplyJobPage = async ({ params }: { params: { code: string } }) => {

  const {
    data: job,
    error: _error
  }: JobFetchType = await Fetch(`/api/job/${params.code}`)
  if(_error || !job)
    return notFound();

  return (
    <div className="flex flex-col">
      <div className="shadow-lg mb-2 border-y border-neutral-400/30">
        <section className="container max-w-[900px] mx-auto">
          <ApplyJobHeader job={job}/>
        </section>
      </div>
      <section className="flex flex-col justify-between gap-2">
        <JobApplicationForm job={job}/>
      </section>
    </div>
  );

};

export default ApplyJobPage;