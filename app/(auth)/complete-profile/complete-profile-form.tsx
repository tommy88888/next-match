'use client';

import CardWrapper from '@/components/card-wrapper';
import { ProfileSchema, profileSchema } from '@/lib/schemas/register-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/lib/next-ui';
import { FormProvider, useForm } from 'react-hook-form';
import ProfileForm from '../register/profile-form';
import { RiProfileLine } from 'react-icons/ri';
import { completeSocialLoginProfile } from '@/actions/auth-actions';
import { signIn } from 'next-auth/react';

type CompleteProfileFormProps = {};

const CompleteProfileForm = () => {
  const methods = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    mode: 'onTouched',
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const onSubmit = async (data: ProfileSchema) => {
    const result = await completeSocialLoginProfile(data);

    if (result.status === 'success') {
      signIn(result.data, {
        callbackUrl: '/members',
      });
    }
  };
  return (
    <CardWrapper
      headerText='About you'
      subHeaderText='Please complete your profile to continue the app'
      headerIcon={RiProfileLine}
      body={
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-4 '>
              <ProfileForm />

              {errors.root && errors.root.serverError && (
                <p className='text-center text-red-700 w-full mx-auto  text-sm bg-rose-100 shadow-lg'>
                  {errors.root.serverError.message}
                </p>
              )}

              <div className='flex flex-row items-center gap-6 '>
                <Button
                  isLoading={isSubmitting}
                  fullWidth
                  color='secondary'
                  type='submit'
                  isDisabled={!isValid}
                >
                  submit
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      }
    />
  );
};

export default CompleteProfileForm;
