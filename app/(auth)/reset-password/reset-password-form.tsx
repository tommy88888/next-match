'use client';

import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { GiPadlock } from 'react-icons/gi';

import {
  generateResetPasswordEmail,
  resetPassword,
} from '@/actions/auth-actions';
import CardWrapper from '@/components/card-wrapper';
import { ActionResult } from '@/types';
import { Button, Input } from '@/lib/next-ui';
import ResultMessage from '@/components/result-message';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from '@/lib/schemas/reset-password-schema';
import { useSearchParams } from 'next/navigation';

type ResetPasswordFormProps = {};

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<ActionResult<string> | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordSchema>({
    mode: 'onTouched',
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    setResult(await resetPassword(data.password, searchParams.get('token')));
    reset();
  };

  return (
    <CardWrapper
      headerIcon={GiPadlock}
      headerText='Reset Password'
      subHeaderText='Enter your new password'
      body={
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col space-y-4 '
        >
          <Input
            type='password'
            placeholder='Password'
            variant='bordered'
            defaultValue=''
            {...register('password')}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message as string}
          />
          <Input
            type='password'
            placeholder='ConfirmPassword'
            variant='bordered'
            defaultValue=''
            {...register('confirmPassword')}
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message as string}
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

export default ResetPasswordForm;
