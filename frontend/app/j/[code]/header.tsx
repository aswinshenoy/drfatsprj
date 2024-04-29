import React from "react";
import {Badge, Button} from "chaya-ui";
import Link from "next/link";

import { JobType, JobPageParams } from "@/app/j/[code]/types";


const JobHeader = ({ job, params }: { job: JobType, params: JobPageParams }) => (
  <div className="p-3 md:p-4 lg:p-5 flex flex-wrap mx-0 justify-between items-center">
    <div className="w-full md:w-2/3 p-2 flex flex-col justify-center min-h-[15vh] gap-4">
      <div>
        <Link href="/" className="inline-flex items-center hover:bg-neutral-200/50 rounded-lg px-2 py-1">
          <i className="ri-arrow-left-line mr-2" />
          Back to Jobs
        </Link>
      </div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
        {job.title}
      </h1>
      <div className="text-lg md:text-xl">
        {job.department?.name}
      </div>
      <div className="flex opacity-80 text-sm md:text-base flex-wrap gap-2">
        <div>
          <Badge
            size="sm"
            variant="minimal"
            color="shade"
            className="text-neutral-900"
          >
            <i className="ri-building-2-fill text-lg mr-2" />
            {job.workplaceModels?.length > 1 ?
              job.workplaceModels.map((m) => m.name).join(" / ") :
              job.workplaceModels.map((m) => m.name)
            }
          </Badge>
        </div>
        <div>
          <Badge
            size="sm"
            variant="minimal"
            color="shade"
            className="text-neutral-900"
          >
            <i className="ri-briefcase-4-fill text-lg mr-2" />
            {job.workType?.name}
          </Badge>
        </div>
        <div className="flex flex-wrap mx-0 gap-2">
            <Badge
              size="sm"
              variant="minimal"
              color="shade"
              className="text-neutral-900"
            >
              <i className="ri-map-pin-2-fill text-lg mr-2" />
              {job.locations.map((l) => l.name).join(", ")}
            </Badge>
        </div>
      </div>
    </div>
    <div className="w-full md:w-1/3 flex md:justify-end p-2">
        <Button
          link={`/j/${job.jobID}/apply${params.source ? `?source=${params.source}` : ''}`}
          className="group"
        >
          Apply Now
          <i className="ri-arrow-right-line group-hover:-rotate-45 transition-all duration-100"/>
        </Button>
    </div>
  </div>
);

export default JobHeader;