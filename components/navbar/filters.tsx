'use client';

import { useFilters } from '@/hooks/use-filters';
import {
  Button,
  Select,
  SelectItem,
  Slider,
  Spinner,
  Switch,
} from '@/lib/next-ui';

const Filters = () => {
  const {
    orderByList,
    searchParams,
    genderList,
    filters,
    selectAge,
    selectGender,
    selectOrder,
    isPending,
    selectWithPhoto,
  } = useFilters();
  // const searchParams = useSearchParams();
  // const router = useRouter();

  // const orderByList = [
  //   { label: 'Last active', value: 'updated' },
  //   { label: 'Newest members', value: 'created' },
  // ];

  // const genders = [
  //   { value: 'male', icon: FaMale },
  //   { value: 'female', icon: FaFemale },
  // ];

  // const selectedGender = searchParams.get('gender')?.split(',') || [
  //   'male',
  //   'female',
  // ];

  // const handleAgeSelect = (value: number[]) => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set('ageRange', value.join(','));
  //   router.replace(`${pathname}?${params}`);
  // };

  // const handleOrderSelect = (value: Selection) => {
  //   if (value instanceof Set) {
  //     const params = new URLSearchParams(searchParams);
  //     params.set('orderBy', value.values().next().value as string);
  //     router.replace(`${pathname}?${params}`);
  //   }
  // };

  // const handleGenderSelect = (value: string) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (selectedGender.includes(value)) {
  //     params.set(
  //       'gender',
  //       selectedGender.filter((g) => g !== value).toString()
  //     );
  //   } else {
  //     params.set('gender', [...selectedGender, value].toString());
  //   }
  //   router.replace(`${pathname}?${params}`);
  // };

  // if (pathname !== '/members') return null;

  return (
    <div className='shadow-md py-2 '>
      <div className='flex flex-row justify-around items-center '>
        <div className='flex gap-2 items-center  '>
          <div className='text-secondary font-semibold text-xl '>
            Result: 10
          </div>
          {isPending && <Spinner size='sm' color='secondary' />}
        </div>
        <div className='flex gap-2 items-center '>
          <div>Gender:</div>
          {genderList.map(({ icon: Icon, value }) => (
            <Button
              key={value}
              size='sm'
              isIconOnly
              color={filters.gender.includes(value) ? 'secondary' : 'default'}
              onClick={() => selectGender(value)}
            >
              <Icon size={24} />
            </Button>
          ))}
        </div>
        <div className='flex flex-row items-center gap-2 w-1/4 '>
          <Slider
            label='Age range'
            color='secondary'
            size='sm'
            minValue={18}
            maxValue={100}
            defaultValue={filters.ageRange}
            onChangeEnd={(value) => selectAge(value as number[])}
            aria-label='Age slider'
          />
        </div>
        <div className='flex flex-col items-center'>
          <p className='text-sm'>With photo</p>
          <Switch
            color='secondary'
            defaultSelected
            size='sm'
            onChange={selectWithPhoto}
          />
        </div>
        <div className='w-1/4 '>
          <Select
            size='sm'
            fullWidth
            label='Order By'
            variant='bordered'
            color='secondary'
            aria-label='order by selector'
            selectedKeys={new Set([searchParams.get('orderBy') || 'updated'])}
            onSelectionChange={selectOrder}
          >
            {orderByList.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className='text-gray-700 '
              >
                {item.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
