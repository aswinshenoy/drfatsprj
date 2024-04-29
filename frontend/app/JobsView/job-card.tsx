'use client';
import React from "react";
import {Badge, Button} from "chaya-ui";
import Link from "next/link";
import clsx from "clsx";

export type JobListType = {
  id: number;
  jobID: string,
  title: string;
  department: {
    id: string,
    name: string
  };
  workType: {
    id: string,
    name: string
  };
  locations: {
    id: string,
    name: string
  }[];
  workplaceModels: {
    id: string,
    name: string
  }[];
};

const JobCard = ({ job, firstCard = false, lastCard = false }: { job: JobListType, firstCard?: boolean, lastCard?: boolean }) => (
  <Link href={`/j/${job.jobID}`} className="group">
    <div
      className={clsx([
        "py-4 px-2 flex flex-wrap items-center justify-between w-full mx-0",
        "rounded-x-lg md:rounded-x-xl",
        lastCard && "rounded-b-lg md:rounded-b-xl",
        firstCard && "rounded-t-lg  md:rounded-t-xl",
        "border border-neutral-400/20 shadow hover:shadow-none transition-all duration-100",
        "hover:border-neutral-400/30",
      ])}
    >
      <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col p-2 gap-2">
        <h3 className="text-lg md:text-xl group-hover:text-purple-800">
          {job.title}
        </h3>
        <div className="flex uppercase opacity-80 text-sm md:text-base flex-wrap gap-2">
          <div>
            <Badge
              size="xs"
              variant="minimal"
              color="shade"
              className="text-neutral-900"
            >
              <i className="ri-building-2-fill mr-2" />
              {job.workplaceModels?.length > 1 ?
                job.workplaceModels.map((m) => m.name).join(" / ") :
                job.workplaceModels.map((m) => m.name)
              }
            </Badge>
          </div>
          <div>
            <Badge
              size="xs"
              variant="minimal"
              color="shade"
              className="text-neutral-900"
            >
              <i className="ri-briefcase-4-fill mr-2" />
              {job.workType?.name}
            </Badge>
          </div>
          <div>
            <Badge
              size="xs"
              variant="minimal"
              color="shade"
              className="text-neutral-900"
            >
              <i className="ri-map-pin-2-fill mr-2" />
              {job.locations.map((l) => l.name).join(", ")}
            </Badge>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:w-1/3 lg:w-1/4 md:justify-end p-2">
        <Button
          size="sm"
          variant="minimal"
          color="shade"
        >
          View Job
          <i className="ri-arrow-right-line group-hover:-rotate-45 transition-all duration-100" />
        </Button>
      </div>
    </div>
  </Link>
);

export default JobCard;