import React, {useEffect} from "react";
import {SearchBox, SimpleSelect} from "chaya-ui";
import {DepartmentType, FilterTypeData} from "@/app/JobsView/index";
import {usePathname, useRouter, useSearchParams } from "next/navigation";

const JobViewFilter = ({ locations, departments, workplaceModels, workplaceTypes }: {
  locations: FilterTypeData[]
  departments: DepartmentType[]
  workplaceModels: FilterTypeData[]
  workplaceTypes: FilterTypeData[]
}) => {

  const [filters, setFilters] = React.useState({
    keyword: '',
    location: '',
    department: '',
    workplaceModel: '',
    workplaceType: ''
  });

  const router = useRouter();
  const pathname = usePathname();

  const setQuery = () => {
    const path = pathname.split('?')[0];
    const query = new URLSearchParams();
    for (const key in filters) {
      if (filters[key as keyof typeof filters]) {
        query.set(key, filters[key as keyof typeof filters]);
      }
    }
    router.push(`${path}?${query.toString()}`);
  };

  useEffect(setQuery, [filters, pathname, router]);

  return (
    <div className="flex flex-col py-4 md:py-6 lg:py-8 gap-2">
      <div className="p-2">
        <SearchBox
          hideLabel
          hideButton
          labels={{
            label: 'Search',
            placeholder: 'Search by job title, department etc.'
          }}
          inputClassName="text-lg"
          keyword={filters.keyword}
          setKeyword={(keyword) => setFilters({ ...filters, keyword  })}
        />
      </div>
      <div className="flex flex-wrap mx-0">
        <div className="w-full md:w-1/3 lg:w-1/4 p-2">
          <SimpleSelect
            hideLabel
            value={filters.workplaceModel}
            onChange={(workplaceModel) => setFilters({...filters, workplaceModel})}
            name="workplace_model"
            labels={{
              label: "Location Type",
              placeholder: "Location Type",
            }}
            options={workplaceModels.map((workplaceModel) => ({
              label: workplaceModel.name,
              value: workplaceModel.id,
              icon: workplaceModel.name.toLowerCase() === 'remote' ?
                'ri-globe-line' : workplaceModel.name.toLowerCase() === 'hybrid' ? 'ri-plane-line' :
                  'ri-briefcase-line'
            }))}
          />
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4 p-2">
          <SimpleSelect
            hideLabel
            value={filters.location}
            onChange={(location) => setFilters({...filters, location})}
            name="location"
            labels={{
              label: "Location",
              placeholder: "Location",
            }}
            options={locations.map((location) => ({
              label: location.name,
              value: location.id,
            }))}
          />
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4 p-2">
          <SimpleSelect
            hideLabel
            value={filters.department}
            onChange={(department) => setFilters({...filters, department})}
            name="department"
            labels={{
              label: "Department",
              placeholder: "Department",
            }}
            options={departments.filter((d) => d.parent === null).map((department) => ({
              group: department.name,
              options: departments.filter((d) => d.parent === department.id).map((subDepartment) => ({
                label: subDepartment.name,
                value: subDepartment.id,
              })),
            }))}
          />
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4 p-2">
          <SimpleSelect
            hideLabel
            name="workplace_type"
            value={filters.workplaceType}
            onChange={(workplaceType) => setFilters({...filters, workplaceType})}
            labels={{
              label: "Work Type",
              placeholder: "Work Type"
            }}
            options={workplaceTypes.map((workplaceType) => ({
              value: workplaceType.id,
              label: workplaceType.name,
            }))}
          />
        </div>
      </div>
    </div>
  );

};

export default JobViewFilter;