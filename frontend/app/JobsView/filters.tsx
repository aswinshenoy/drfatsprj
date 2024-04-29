import React, {useEffect, useState} from "react";
import {Button, Modal, SearchBox, SimpleSelect} from "chaya-ui";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

import {DepartmentType, FilterTypeData} from "@/app/JobsView/index";

export type JobFilterType = {
  keyword: string | undefined,
  location: string | undefined,
  department: string | undefined,
  workplaceModel: string | undefined,
  workType: string | undefined
};

const JobViewFilter = ({ locations, departments, workplaceModels, workTypes, filters: f }: {
  locations: FilterTypeData[]
  departments: DepartmentType[]
  workplaceModels: FilterTypeData[]
  workTypes: FilterTypeData[],
  filters: JobFilterType
}) => {

  const [showFiltersOnMobile, setShowFiltersOnMobile] = useState(false);

  const [filters, setFilters] = useState<JobFilterType>({
    keyword: f.keyword ?? '',
    location: f.location ?? undefined,
    department: f.department ?? undefined,
    workplaceModel: f.workplaceModel ?? undefined,
    workType: f.workType ?? undefined
  });

  const router = useRouter();
  const pathname = usePathname();
  const isFiltering = Object.values(f).filter((v) => v).length > 0;

  const setQuery = () => {
    const path = pathname.split('?')[0];
    const query = new URLSearchParams();
    for (const key in filters) {
      if (filters[key as keyof typeof filters]) {
        query.set(key, filters[key as keyof typeof filters] ?? '');
      }
    }
    router.push(`${path}?${query.toString()}`);
    router.refresh();
  };

  useEffect(setQuery, [filters, pathname, router]);

  const filtersView = () => (
    <React.Fragment>
      <div className="w-full md:w-1/3 lg:w-1/4 p-2">
        <SimpleSelect
          id="workplace_model-select"
          hideLabel
          value={filters.workplaceModel}
          onChange={(workplaceModel) => setFilters({...filters, workplaceModel})}
          name="workplace_model"
          labels={{
            label: "Location Type",
            placeholder: "Location Type",
          }}
          options={[
            {label: 'All Location Types', value: undefined},
            ...(workplaceModels ?? []).map((workplaceModel) => ({
              label: workplaceModel.name,
              value: workplaceModel.id.toString(),
              icon: workplaceModel.name.toLowerCase() === 'remote' ?
                'ri-globe-line' : workplaceModel.name.toLowerCase() === 'hybrid' ? 'ri-plane-line' :
                  'ri-briefcase-line'
            }))
          ]}
        />
      </div>
      <div className="w-full md:w-1/3 lg:w-1/4 p-2">
        <SimpleSelect
          id="location-select"
          hideLabel
          value={filters.location}
          onChange={(location) => setFilters({...filters, location})}
          name="location"
          labels={{
            label: "Location",
            placeholder: "Location",
          }}
          options={[
            {label: 'All Locations', value: undefined},
            ...(locations ?? []).map((location) => ({label: location.name, value: location.id.toString()}))
          ]}
        />
      </div>
      <div className="w-full md:w-1/3 lg:w-1/4 p-2">
        <SimpleSelect
          id="department-select"
          hideLabel
          value={filters.department}
          onChange={(department) => setFilters({...filters, department})}
          name="department"
          labels={{
            label: "Department",
            placeholder: "Department",
          }}
          options={[
            {label: 'All Departments', value: undefined},
            ...departments.filter((d) => d.parent === null).map((department) => ({
              group: department.name,
              options: (departments ?? []).filter((d) => d.parent === department.id).map((subDepartment) => ({
                label: subDepartment.name,
                value: subDepartment.id.toString(),
              })),
            }))
          ]}
        />
      </div>
      <div className="w-full md:w-1/3 lg:w-1/4 p-2">
        <SimpleSelect
          id="workplace_type-select"
          hideLabel
          name="workplace_type"
          value={filters.workType}
          onChange={(workType) => setFilters({...filters, workType})}
          labels={{
            label: "Work Type",
            placeholder: "Work Type"
          }}
          options={[
            {label: 'All Work Types', value: undefined},
            ...(workTypes ?? []).map((workType) => ({value: workType.id.toString(), label: workType.name}))
          ]}
        />
      </div>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <div className="flex flex-row md:flex-col px-3 py-4 md:py-6 lg:py-8 gap-2">
        <div className="w-full">
          <SearchBox
            hideLabel
            hideButton
            labels={{
              label: 'Search',
              placeholder: 'Search by job title, department etc.'
            }}
            inputClassName="text-xl"
            keyword={filters.keyword ?? ''}
            setKeyword={(keyword) => setFilters({...filters, keyword})}
          />
        </div>
        <div className="hidden md:flex flex-wrap -mx-2">
          {filtersView()}
        </div>
        <div className="md:hidden justify-end">
          <Button
            variant={isFiltering ? 'solid' : 'minimal'}
            color={isFiltering ? 'primary' : 'shade'}
            onClick={() => setShowFiltersOnMobile(!showFiltersOnMobile)}
            leftIcon="ri-filter-line text-lg p-0"
          />
        </div>
      </div>
      <Modal
        title="Filters"
        titleIcon="ri-filter-line"
        isOpen={showFiltersOnMobile}
        onClose={() => setShowFiltersOnMobile(false)}
      >
        <div className="flex flex-col gap-3 pb-6 pt-2">
          {filtersView()}
          <div className="px-2 mt-3">
            <Button
              className="py-4 w-full"
              onClick={() => setShowFiltersOnMobile(false)}
            >
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );

};

export default JobViewFilter;