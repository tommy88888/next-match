'use client';

import { genderList } from '@/hooks/use-filters';
import { Input, Select, SelectItem, Textarea } from '@/lib/next-ui';
import { format, subYears } from 'date-fns';
import { useFormContext } from 'react-hook-form';

type ProfileFormProps = {};

const ProfileForm = () => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='space-y-4 '>
      <Select
        label='Gender'
        defaultSelectedKeys={getValues('gender')}
        placeholder='Select Your Gender'
        className='max-w-xs'
        {...register('gender')}
        aria-label='Select gender'
        isInvalid={!!errors.gender}
        errorMessage={errors.gender?.message as string}
        onChange={(e) => setValue('gender', e.target.value)}
      >
        {genderList.map(({ label, value, icon: Icon }) => (
          <SelectItem
            key={value}
            value={value}
            startContent={<Icon />}
            className='text-gray-700'
          >
            {label}
          </SelectItem>
        ))}
      </Select>

      <Input
        label='dateOfBirth'
        variant='bordered'
        type='date'
        max={format(subYears(new Date(), 18), 'yyyy-MM-dd')}
        {...register('dateOfBirth')}
        defaultValue={getValues('dateOfBirth')}
        isInvalid={!!errors.dateOfBirth}
        errorMessage={errors.dateOfBirth?.message as string}
      />

      <Textarea
        label='description'
        defaultValue={getValues('description')}
        variant='bordered'
        {...register('description')}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message as string}
        minRows={6}
      />

      <div className='flex flex-row gap-3'>
        <Input
          label='city'
          defaultValue={getValues('city')}
          variant='bordered'
          {...register('city')}
          isInvalid={!!errors.city}
          errorMessage={errors.city?.message as string}
        />
        <Input
          label='country'
          defaultValue={getValues('country')}
          variant='bordered'
          {...register('country')}
          isInvalid={!!errors.country}
          errorMessage={errors.country?.message as string}
        />
      </div>
      {errors.root && errors.root.serverError && (
        <p className='text-center text-red-700 w-full mx-auto text-sm bg-rose-100 shadow-lg'>
          {errors.root.serverError.message as string}
        </p>
      )}
    </div>
  );
};

export default ProfileForm;
