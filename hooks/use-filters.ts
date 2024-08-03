import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { FaMale, FaFemale } from 'react-icons/fa';
import { useFilterStore } from './use-filter-store';
import { ChangeEvent, useEffect, useTransition } from 'react';
import { Selection } from '@/lib/next-ui';
import { usePaginationStore } from './use-pagination-store';

export const genderList = [
  { label: 'Male', value: 'male', icon: FaMale },
  { label: 'Female', value: 'female', icon: FaFemale },
];

export const useFilters = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const { filters, setFilters } = useFilterStore();

  const { pageNumber, pageSize, setPage, totalCount } = usePaginationStore(
    (state) => ({
      pageNumber: state.pagination.pageNumber,
      pageSize: state.pagination.pageSize,
      setPage: state.setPage,
      totalCount: state.pagination.totalCount,
    })
  );

  const { gender, ageRange, orderBy, withPhoto } = filters;

  useEffect(() => {
    if (gender || ageRange || orderBy || withPhoto) {
      setPage(1);
    }
  }, [gender, ageRange, orderBy, setPage, withPhoto]);

  useEffect(() => {
    startTransition(() => {
      const searchParams = new URLSearchParams();

      if (gender) searchParams.set('gender', gender.join(','));
      if (ageRange) searchParams.set('ageRange', ageRange.toString());
      if (orderBy) searchParams.set('orderBy', orderBy);
      if (pageSize) searchParams.set('pageSize', pageSize.toString());
      if (pageNumber) searchParams.set('pageNumber', pageNumber.toString());
      searchParams.set('withPhoto', withPhoto.toString());

      router.replace(`${pathname}?${searchParams}`);
    });
  }, [
    ageRange,
    orderBy,
    gender,
    router,
    pathname,
    pageNumber,
    pageSize,
    withPhoto,
  ]);

  const orderByList = [
    { label: 'Last active', value: 'updated' },
    { label: 'Newest members', value: 'created' },
  ];

  // const selectedGender = searchParams.get('gender')?.split(',') || [
  //   'male',
  //   'female',
  // ];
  const handleAgeSelect = (value: number[]) => {
    // const params = new URLSearchParams(searchParams);
    // params.set('ageRange', value.join(','));
    // router.replace(`${pathname}?${params}`);
    setFilters('ageRange', value);
  };

  const handleOrderSelect = (value: Selection) => {
    if (value instanceof Set) {
      // const params = new URLSearchParams(searchParams);
      // params.set('orderBy', value.values().next().value as string);
      // router.replace(`${pathname}?${params}`);

      setFilters('orderBy', value.values().next().value);
    }
  };

  const handleGenderSelect = (value: string) => {
    // const params = new URLSearchParams(searchParams);
    // if (selectedGender.includes(value)) {
    //   params.set(
    //     'gender',
    //     selectedGender.filter((g) => g !== value).toString()
    //   );
    // } else {
    //   params.set('gender', [...selectedGender, value].toString());
    // }
    // router.replace(`${pathname}?${params}`);

    if (gender.includes(value))
      setFilters(
        'gender',
        gender.filter((g) => g !== value)
      );
    else setFilters('gender', [...gender, value]);
  };

  const handleWithPhotoToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters('withPhoto', e.target.checked);
  };

  return {
    pathname,
    orderByList,
    searchParams,
    genderList,
    filters,
    selectAge: handleAgeSelect,
    selectGender: handleGenderSelect,
    selectOrder: handleOrderSelect,
    selectWithPhoto: handleWithPhotoToggle,
    totalCount,
    isPending,
  };
};
