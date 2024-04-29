import React from "react";
import {JobType} from "@/app/j/[code]/types";
import Link from "next/link";
import {Badge} from "chaya-ui";

const ApplyJobHeader = ({ job }: { job: JobType }) => (
  <div className="flex flex-row mx-0 justify-between items-center h-fit border-l border-neutral-400/30">
    <Link href={`/j/${job.jobID}`} className="items-center hover:text-primary h-full inline-flex text-3xl gap-2">
      <div className="p-4 h-full w-[72px] md:w-[120px] flex items-center justify-center">
        <i className="ri-arrow-left-line"/>
      </div>
    </Link>
    <div className="border-l border-neutral-400/30 p-4 flex flex-col w-full gap-1">
      <h1 className="text-lg md:text-xl font-semibold">
        Apply for {job.title}
      </h1>
      <div className="hidden md:flex uppercase opacity-80 text-sm md:text-base flex-wrap gap-2">
        <div>
          <Badge
            size="xs"
            variant="minimal"
            color="shade"
            className="text-neutral-900"
          >
            <i className="ri-building-2-fill mr-2"/>
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
            <i className="ri-briefcase-4-fill mr-2"/>
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
            <i className="ri-map-pin-2-fill mr-2"/>
            {job.locations.map((l) => l.name).join(", ")}
          </Badge>
        </div>
      </div>
    </div>
  </div>
);

export default ApplyJobHeader;