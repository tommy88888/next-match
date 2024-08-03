'use client';

import { Input } from '@/lib/next-ui';

import { useFormContext } from 'react-hook-form';

type UserDetailsFormProps = {};

const UserDetailsForm = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='space-y-4 '>
      <Input
        label='Name'
        defaultValue={getValues('name')}
        variant='bordered'
        {...register('name')}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message as string}
      />
      <Input
        label='Email'
        defaultValue={getValues('email')}
        variant='bordered'
        {...register('email')}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message as string}
      />
      <Input
        label='password'
        variant='bordered'
        defaultValue={getValues('password')}
        {...register('password')}
        type='password'
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message as string}
      />
      {/* <Select
        label='Gender'
        placeholder='Select Your Gender'
        className='max-w-xs'
        {...register('gender')}
      >
        {genderList.map(({ value, icon: Icon }) => (
          <SelectItem
            key={value}
            value={value}
            startContent={<Icon />}
            className='text-gray-700'
          >
            {value}
          </SelectItem>
        ))}
      </Select>

      <Input
        label='dateOfBirth'
        variant='bordered'
        type='date'
        {...register('dateOfBirth')}
        defaultValue=''
        isInvalid={!!errors.dateOfBirth}
        errorMessage={errors.dateOfBirth?.message as string}
      />

      <Textarea
        label='description'
        defaultValue=''
        variant='bordered'
        {...register('description')}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message as string}
        minRows={6}
      />

      <div className='flex flex-row gap-3'>
        <Input
          label='city'
          defaultValue=''
          variant='bordered'
          {...register('city')}
          isInvalid={!!errors.city}
          errorMessage={errors.city?.message as string}
        />
        <Input
          label='country'
          defaultValue=''
          variant='bordered'
          {...register('country')}
          isInvalid={!!errors.country}
          errorMessage={errors.country?.message as string}
        />
      </div> */}
      {errors.root && errors.root.serverError && (
        <p className='text-center text-red-700 w-full mx-auto text-sm bg-rose-100 shadow-lg'>
          {errors.root.serverError.message as string}
        </p>
      )}
    </div>
  );
};

export default UserDetailsForm;
