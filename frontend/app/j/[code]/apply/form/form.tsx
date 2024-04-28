import React from "react";
import {CheckboxGroup, RadioGroup, TextInput} from "chaya-ui";
import clsx from "clsx";

import {JobType} from "@/app/j/[code]/types";

import {ApplicationDataType} from "./types";
import VoiceField, {VoiceData} from "@/app/shared/VoiceField";

const FormFields = ({ job, data, setData }: {
  data: ApplicationDataType, setData: (data: ApplicationDataType) => void,
  job: JobType
}) => (
  <React.Fragment>
    {job.formSections && job.formSections?.length > 0 ?
      job.formSections.map((s, index) => (
        <div
          key={`${index}-${s.title}`}
          className="flex rounded-lg md:rounded-xl md:p-4 lg:p-6 bg-white shadow-lg flex-wrap mx-0"
        >
          <h3 className="w-full p-2 mb-4 text-lg md:text-xl opacity-80">
            {s.title}
          </h3>
          {s.description?.length > 0 ? (
            <p>
              {s.description}
            </p>
          ) : null}
          <div className="flex flex-wrap w-full mx-0">
            {s.questions.map((f) => (
              <div
                key={f.id}
                className={clsx([
                  "w-full p-3",
                  f.type === 'TEXTAREA' || f.type === 'RADIO' || f.type === 'CHECKBOX' ||
                    f.type === 'VOICE' ? 'md:w-full' : 'md:w-1/2'
                ])}
              >
                {f.type === 'LINK' || f.type == 'TEXT' || f.type == 'TEXTAREA' ? (
                  <TextInput
                    label={f.label}
                    name={f.id}
                    isRequired={f.isRequired}
                    placeholder={f.placeholder ?? ' '}
                    value={data.formData?.[f.id] as string ?? ''}
                    onChange={(value) => setData({
                      ...data,
                      formData: {
                        ...(data?.formData || []),
                        [f.id]: value
                      }
                    })}
                    className="w-full"
                    type={f.type === 'LINK' ? 'url' : f.type === 'TEXTAREA' ? 'textarea' : 'text'}
                  />
                ) : f.type === 'RADIO' ? (
                  <RadioGroup
                    label={f.label}
                    isRequired={f.isRequired}
                    value={data.formData?.[f.id] as string ?? ''}
                    options={[
                      ...f.options?.map((f) => ({label: f, value: f}))
                    ]}
                    onChange={(value) => setData({
                      ...data,
                      formData: {
                        ...(data?.formData || []),
                        [f.id]: value
                      }
                    })}
                  />
                ) : f.type === 'CHECKBOX' ? (
                  <CheckboxGroup
                    label={f.label}
                    isRequired={f.isRequired}
                    value={data.formData?.[f.id] as string[] ?? ''}
                    options={[
                      ...f.options?.map((f) => ({label: f, value: f}))
                    ]}
                    onChange={(value) => setData({
                      ...data,
                      formData: {
                        ...(data?.formData || []),
                        [f.id]: value
                      }
                    })}
                  />
                ) : f.type === 'VOICE' ? (
                  <VoiceField
                    label={f.label}
                    isRequired={f.isRequired}
                    value={data.formData?.[f.id] as VoiceData ?? ''}
                    onChange={(value) => setData({
                      ...data,
                      formData: {
                        ...(data?.formData || []),
                        [f.id]: value ?? null
                      }
                    })}
                  />
                ) : <div/>}
              </div>
            ))}
          </div>
        </div>
      )) : null}
  </React.Fragment>
);

export default FormFields;