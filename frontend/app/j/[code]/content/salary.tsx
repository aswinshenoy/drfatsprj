import React from "react";
import {useCurrencyFormatter} from "chaya-ui";

import {JobType} from "@/app/j/[code]/types";

const SALARY_TIMEFRAME_INDICATOR_MAP = {
  HOURLY: '/hour',
  DAILY: '/day',
  WEEKLY: '/week',
  MONTHLY: '/month',
  YEARLY: '/year'
}

const Salary = ({ job }: { job: JobType }) => {

  const formatCurrency = useCurrencyFormatter();

  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-semibold text-sm opacity-75">
        <i className="ri-hand-coin-fill mr-1"/>{" "}
        Compensation
      </h4>
      <div className="flex gap-0.5 text-sm">
        {job.salaryInformation == 1 && job?.minSalary ? (
          <div>
            {formatCurrency(job?.minSalary ?? 0, job?.salaryCurrency ?? 'INR', 0)}
          </div>
        ) : job.salaryInformation == 2 && job?.minSalary && job?.maxSalary ? (
          <div>
            {`${formatCurrency(job?.minSalary ?? 0, job?.salaryCurrency ?? 'INR', 0)} - ${formatCurrency(job.maxSalary ?? 0, job?.salaryCurrency ?? 'INR', 0)}`}
          </div>
        ) : null}
        {SALARY_TIMEFRAME_INDICATOR_MAP[job?.salaryTimeframe]}
      </div>
    </div>
  );

};

export default Salary;