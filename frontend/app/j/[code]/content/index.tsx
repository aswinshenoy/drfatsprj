'use client';
import React from "react";
import { MarkdownViewer } from 'react-github-markdown';
import { Button } from "chaya-ui";
import { format, parseISO } from "date-fns";

import { JobType, JobPageParams } from "@/app/j/[code]/types";

import Salary from "./salary";
import Skills from "./skills";
import Share from "./share";

const ContentView = ({ job, params }: { job: JobType, params: JobPageParams }) => (
  <div className="bg-neutral-50 min-h-[75vh]">
    <div className="container max-w-[1000px] py-5 px-4 md:py-6 mx-auto">
      <div className="flex flex-wrap mx-0">
        <div className="w-full md:w-2/3 p-2 order-2 md:order-1">
          <MarkdownViewer
            isDarkTheme={false}
            value={job.description}
          />
          <div className="p-3 mt-6">
            <Button
              link={`/j/${job.jobID}/apply${params.source ? `?source=${params.source}` : ''}`}
              className="group"
            >
              Apply Now
              <i className="ri-arrow-right-line group-hover:-rotate-45 transition-all duration-100"/>
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex-col flex gap-3 py-4 md:py-2 md:px-2 order-1 md:order-2">
          <div className="p-3 md:p-4 lg:p-6 flex flex-col gap-4 md:gap-6 bg-white border border-neutral-300/30 rounded md:rounded-lg">
            {job.skills?.length > 0 ? (
              <Skills job={job} />
            ) : null}
            {(job.minExperienceYears || job.idealExperienceYears) ? (
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-sm opacity-75">
                  <i className="ri-briefcase-2-fill mr-1"/>{" "}
                  Experience
                </h4>
                <div className="text-sm">
                {job.minExperienceYears && job.idealExperienceYears ?
                  `${job.minExperienceYears} - ${job.idealExperienceYears} years`
                 : job.minExperienceYears ?
                  `Min. ${job.minExperienceYears} years`
                : job.idealExperienceYears ?
                  `${job.idealExperienceYears} years (Preferred)`
                : null}
                </div>
              </div>
            ) : null}
            {job.salaryInformation > 0 ? (
              <Salary job={job} />
            ) : null}
          </div>
          <Share job={job} />
          {job.timestampPosted ? (
            <div className="opacity-80 px-2 uppercase text-xs">
              <i className="ri-time-line mr-1"/>{" "}
              Posted on{' '}
              <span title={format(parseISO(job.timestampPosted), 'dd MMM yyyy, hh:mm a')}>
              {format(parseISO(job.timestampPosted), 'dd MMM yyyy')}
            </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  </div>
);

export default ContentView;