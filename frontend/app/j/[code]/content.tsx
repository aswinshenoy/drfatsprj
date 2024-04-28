'use client';
import React from "react";
import { MarkdownViewer } from 'react-github-markdown';
import {Badge, Button} from "chaya-ui";
import { format, parseISO } from "date-fns";

import {JobType} from "@/app/j/[code]/types";


const ContentView = ({ job }: { job: JobType }) => (
  <div className="bg-neutral-50 p-3 md:p-4 lg:p-5 min-h-[75vh]">
    <div className="container max-w-[1000px] py-5 px-4 md:py-6 mx-auto">
      <div className="flex flex-wrap mx-0">
        <div className="w-full md:w-2/3 lg:w-3/4 p-2 order-2 md:order-1">
          {job.timestampPosted ? (
            <div className="mb-4 opacity-80 uppercase text-sm">
              Posted on{' '}
              <span title={format(parseISO(job.timestampPosted), 'dd MMM yyyy, hh:mm a')}>
                {format(parseISO(job.timestampPosted), 'dd MMM yyyy')}
              </span>
            </div>
          ) : null}
          <MarkdownViewer
            isDarkTheme={false}
            value={job.description}
          />
          <div className="p-3 mt-6">
            <Button
              link={`/j/${job.jobID}/apply`}
              className="group"
            >
              Apply Now
              <i className="ri-arrow-right-line group-hover:-rotate-45 transition-all duration-100"/>
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4 p-1 order-1 md:order-2">
          <div className="p-3 md:p-4 bg-white border border-neutral-300/30 rounded md:rounded-lg">
            {job.skills?.length > 0 ? (
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {job.skills.map((s) => (
                    <Badge key={s.id} size="xs" color="shade" variant="minimal">
                      {s.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ContentView;