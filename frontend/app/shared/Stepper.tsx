'use client';
import React from 'react';
import clsx from 'clsx';

type StepProps = {
  id: string,
  label: string,
  isHidden?: boolean
};

type StepperProps = {
  currentStepID: string,
  steps: StepProps[]
};

const Stepper = ({ steps: _steps, currentStepID }: StepperProps) => {

  const steps = _steps.filter((s) => !s.isHidden);

  const currentStepIndex = steps.findIndex(step => step.id === currentStepID);

  return (
      <div className="flex items-start justify-center p-2">
          {steps.map((step, index) => (
              <div key={step.id} className="flex items-center justify-between w-full">
                  <div className="flex flex-col items-center gap-2 w-full">

                  <div
                    className={clsx([
                      '!w-10 !h-10 flex justify-center items-center rounded-full',
                      index < currentStepIndex ? 'bg-green-500' : index == currentStepIndex ? 'bg-primary text-primaryTextColor' : 'bg-gray-300',
                    ])}
                  >
                    {index < currentStepIndex ? <span className="text-white ri-check-fill"/> : index + 1}
                  </div>
                  <span
                    className={clsx([
                      'text-sm w-[90px] max-w-full text-center',
                      index < currentStepIndex ? 'text-green-500' : index == currentStepIndex ? 'text-primary' : '',
                    ])}
                  >
                      {step.label}
                  </span>
                </div>
              </div>
          ))}
      </div>
  );

};

export default Stepper;