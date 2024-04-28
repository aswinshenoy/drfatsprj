'use client';
import React, {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {SearchBox, SimpleSelect, TextInput} from "chaya-ui";

const ApplicationsFilter = () => {

  const [filters, setFilters] = React.useState<{
    keyword: string,
    minSalaryExpected: null | number,
    maxSalaryExpected: null | number,
    minExperience: null | number,
    maxExperience: null | number,
    minAge: null | number,
    maxAge: null | number,
  }>({
    keyword: '',
    minSalaryExpected: null,
    maxSalaryExpected: null,
    minExperience: null,
    maxExperience: null,
    minAge: null,
    maxAge: null,
  });

  const router = useRouter();
  const pathname = usePathname();

  const setQuery = () => {
    const path = pathname.split('?')[0];
    const query = new URLSearchParams();
    for (const key in filters) {
      if (filters[key as keyof typeof filters] != null) {
        query.set(key, filters[key as keyof typeof filters]?.toString() ?? '');
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
            placeholder: 'Search by name...'
          }}
          inputClassName="text-lg"
          keyword={filters.keyword}
          setKeyword={(keyword) => setFilters({ ...filters, keyword  })}
        />
      </div>
      <div className="flex flex-wrap mx-0">
        <div className="w-full md:w-1/2 p-2">
          <TextInput
            label="Min Exp. Salary"
            name="min_exp_salary"
            value={filters?.minSalaryExpected ?? 0}
            type="number"
            onChange={(minSalaryExpected) => setFilters({ ...filters, minSalaryExpected })}
          />
        </div>
        <div className="w-full md:w-1/2 p-2">
          <TextInput
            label="Max Exp. Salary"
            name="max_exp_salary"
            value={filters?.maxSalaryExpected ?? 0}
            type="number"
            onChange={(maxSalaryExpected) => setFilters({ ...filters, maxSalaryExpected })}
          />
        </div>
        <div className="w-full md:w-1/2 p-2">
          <TextInput
            label="Min Experience"
            name="min_exp"
            value={filters?.minExperience ?? 0}
            type="number"
            onChange={(minExperience) => setFilters({ ...filters, minExperience })}
          />
        </div>
        <div className="w-full md:w-1/2 p-2">
          <TextInput
            label="Max Experience"
            name="max_exp"
            value={filters?.maxExperience ?? 0}
            type="number"
            onChange={(maxExperience) => setFilters({ ...filters, maxExperience })}
          />
        </div>
        <div className="w-full md:w-1/2 p-2">
          <TextInput
            label="Min Age"
            name="min_age"
            value={filters?.minAge ?? 0}
            type="number"
            onChange={(minAge) => setFilters({ ...filters, minAge })}
          />
        </div>
        <div className="w-full md:w-1/2 p-2">
          <TextInput
            label="Max Age"
            name="max_age"
            value={filters?.maxAge ?? 0}
            type="number"
            onChange={(maxAge) => setFilters({ ...filters, maxAge })}
          />
        </div>
      </div>
    </div>
  );

};

export default ApplicationsFilter;