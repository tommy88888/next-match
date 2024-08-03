'use client';

import { updateMemberProfile } from '@/actions/user-actions';

import {
  MemberEditSchema,
  memberEditSchema,
} from '@/lib/schemas/member-edit-schema';
import { handleFormServerErrors } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Textarea, Button } from '@/lib/next-ui';
import { Member } from '@prisma/client';

import { notFound, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type EditFormProps = {
  member: Member;
};

const EditForm = ({ member }: EditFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
    mode: 'onTouched',
  });

  useEffect(() => {
    if (member) {
      reset({
        name: member.name,
        description: member.description,
        city: member.city,
        country: member.country,
      });
    }
  }, [member, reset]);

  if (!member) return notFound();
  const onSubmit = async (data: MemberEditSchema) => {
    const nameUpdated = data.name !== member.name;
    const result = await updateMemberProfile(data, nameUpdated);
    if (result.status === 'success') {
      toast.success('Profile updated');
      router.refresh();
      reset({ ...data });
    } else {
      handleFormServerErrors(result, setError);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
      <Input
        label='name'
        variant='bordered'
        {...register('name')}
        defaultValue={member.name}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <Textarea
        label='description'
        variant='bordered'
        {...register('description')}
        defaultValue={member.description}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
        minRows={6}
      />

      <div className='flex flex-row gap-3 '>
        <Input
          label='city'
          variant='bordered'
          {...register('city')}
          defaultValue={member.city}
          isInvalid={!!errors.city}
          errorMessage={errors.city?.message}
        />
        <Input
          label='country'
          variant='bordered'
          {...register('country')}
          defaultValue={member.country}
          isInvalid={!!errors.country}
          errorMessage={errors.country?.message}
        />
      </div>
      {errors.root && errors.root.serverError && (
        <p className='text-center text-red-700 w-full mx-auto  text-sm bg-rose-100 shadow-lg'>
          {errors.root.serverError.message}
        </p>
      )}
      <Button
        type='submit'
        className='flex self-end '
        variant='solid'
        isDisabled={!isValid || !isDirty}
        isLoading={isSubmitting}
        color='secondary'
      >
        Update
      </Button>
    </form>
  );
};

export default EditForm;
