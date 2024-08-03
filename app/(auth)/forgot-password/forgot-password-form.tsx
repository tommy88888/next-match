'use client';

import { generateResetPasswordEmail } from '@/actions/auth-actions';
import CardWrapper from '@/components/card-wrapper';
import { ActionResult } from '@/types';
import { Button, Input } from '@/lib/next-ui';

import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { GiPadlock } from 'react-icons/gi';
import ResultMessage from '@/components/result-message';

type ForgotPasswordFormProps = {};

const ForgotPasswordForm = () => {
  const [result, setResult] = useState<ActionResult<string> | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    setResult(await generateResetPasswordEmail(data.email));
    reset();
  };

  // if (!result) return null;

  return (
    <CardWrapper
      headerIcon={GiPadlock}
      headerText='Forgot Password'
      subHeaderText='Please enter your email address and we will send you a link to reset your password'
      body={
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col space-y-4 '
        >
          <Input
            type='email'
            placeholder='Email'
            variant='bordered'
            defaultValue=''
            {...register('email', { required: true })}
          />
          <Button
            type='submit'
            color='secondary'
            isLoading={isSubmitting}
            isDisabled={!isValid}
          >
            Send reset email
          </Button>
        </form>
      }
      footer={<ResultMessage result={result} />}
    />
  );
};

export default ForgotPasswordForm;
