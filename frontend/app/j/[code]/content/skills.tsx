'use client';
import React, { useState } from "react";
import {JobType} from "@/app/j/[code]/types";
import {Badge} from "chaya-ui";
import clsx from "clsx";

const Skills = ({ job }: { job: JobType }) => {

  const [showAllSkills, setShowAllSkills] = useState(false);

  return (
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
  );

};

export default Skills;