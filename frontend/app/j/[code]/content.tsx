'use client';
import React from "react";
import { MarkdownViewer } from 'react-github-markdown';
import {Badge, Button, useCurrencyFormatter} from "chaya-ui";
import { format, parseISO } from "date-fns";

import {JobType} from "@/app/j/[code]/types";
import clsx from "clsx";


const ContentView = ({ job }: { job: JobType }) => {

  const formatCurrency = useCurrencyFormatter();
  const [showAllSkills, setShowAllSkills] = React.useState(false);

  return (
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
                link={`/j/${job.jobID}/apply`}
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
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-sm opacity-75">
                    <i className="ri-tools-fill mr-1"/>{" "}
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {job.skills?.length < 6 ?
                      job.skills.map((s) => (
                        <Badge key={s.id} size="xs" color="shade" variant="minimal">
                          {s.name}
                        </Badge>
                      )) : (
                        <React.Fragment>
                          {job.skills.slice(0, showAllSkills ? job.skills.length : 5).map((s) => (
                            <Badge key={s.id} size="xs" color="shade" variant="minimal">
                              {s.name}
                            </Badge>
                          ))}
                          {!showAllSkills ? (
                            <Badge size="xs" color="shade" variant="minimal">
                              {`+ ${job.skills.length - 5} Skills`}
                            </Badge>
                          ) : null}
                          <div className="w-full mt-1">
                            <button
                              onClick={() => setShowAllSkills(!showAllSkills)}
                              className="text-sm hover:underline"
                            >
                              {showAllSkills ? 'Collapse' : 'Show All'}
                              <i
                                className={clsx([
                                  showAllSkills ? "ri-arrow-up-s-fill" : "ri-arrow-down-s-fill",
                                  "ml-1"
                                ])}
                              />
                            </button>
                          </div>
                        </React.Fragment>
                      )}
                  </div>
                </div>
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
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-sm opacity-75">
                    <i className="ri-hand-coin-fill mr-1"/>{" "}
                    Compensation
                  </h4>
                  {job.salaryInformation == 1 && job?.minSalary ? (
                    <div className="text-sm">
                      {formatCurrency(job?.minSalary ?? 0, 'INR', 0)}
                    </div>
                  ) : job.salaryInformation == 2 && job?.minSalary && job?.maxSalary ? (
                    <div className="text-sm">
                      {`${formatCurrency(job?.minSalary ?? 0, 'INR', 0)} - ${formatCurrency(job.maxSalary ?? 0, 'INR', 0)}`}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
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
}

export default ContentView;