'use client';

import { register as signUp } from '@/actions/auth-actions';
import {
  profileSchema,
  registerSchema,
  RegisterSchema,
} from '@/lib/schemas/register-schema';

import { zodResolver } from '@hookform/resolvers/zod';

import { Card, CardHeader, CardBody, Button, Input } from '@/lib/next-ui';

import { FormProvider, useForm } from 'react-hook-form';
import { GiPadlock } from 'react-icons/gi';
import UserDetailsForm from './user-details-form';
import { useState } from 'react';
import ProfileForm from './profile-form';
import { handleFormServerErrors } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const stepSchemas = [registerSchema, profileSchema];

const RegisterForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const currentValidationSchema = stepSchemas[activeStep];

  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(currentValidationSchema),
    mode: 'onTouched',
  });

  const {
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = methods;

  const onSubmit = async () => {
    const res = await signUp(getValues());
    if (res.status === 'success') {
      router.push('/register/success');
      toast.success('register successfully');
      console.log('User registered successfully');
    } else {
      handleFormServerErrors(res, setError);
    }

    // console.log(getValues());
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <UserDetailsForm />;
      case 1:
        return <ProfileForm />;
      default:
        return 'Unknown step';
    }
  };

  const onBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onNext = async () => {
    if (activeStep === stepSchemas.length - 1) {
      await onSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
    <Card className='w-2/5 mx-auto'>
      <CardHeader className='flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-2 items-center text-secondary'>
          <div className='flex flex-row gap-3 items-center'>
            <GiPadlock size={30} />
            <h1 className='text-3xl font-semibold '>Register</h1>
          </div>
          <p className='text-neutral-500 '>Welcome back to NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onNext)}>
            <div className='space-y-4 '>
              {getStepContent(activeStep)}
              {/* <UserDetailsForm /> */}
              {/* <Input
              label='Name'
              defaultValue=''
              variant='bordered'
              {...register('name')}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
              />
              <Input
              label='Email'
              defaultValue=''
              variant='bordered'
              {...register('email')}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              />
              <Input
              label='password'
              variant='bordered'
              defaultValue=''
              {...register('password')}
              type='password'
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            /> */}
              {/* {isValid ? 'valid' : 'invalid'}
              {isSubmitting ? 'submitting' : 'not submitting'} */}
              {errors.root && errors.root.serverError && (
                <p className='text-center text-red-700 w-full mx-auto  text-sm bg-rose-100 shadow-lg'>
                  {errors.root.serverError.message}
                </p>
              )}

              <div className='flex flex-row items-center gap-6 '>
                {activeStep !== 0 && (
                  <Button onClick={onBack} fullWidth>
                    Back
                  </Button>
                )}
              </div>
              <Button
                isLoading={isSubmitting}
                fullWidth
                color='secondary'
                type='submit'
                isDisabled={!isValid}
              >
                {activeStep === stepSchemas.length - 1 ? 'Submit' : 'Continue'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardBody>
    </Card>
  );
};

export default RegisterForm;
