'use client';

import CardWrapper from '@/components/card-wrapper';
import { useRouter } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';

type RegisterSuccessPageProps = {};

const RegisterSuccessPage = () => {
  const router = useRouter();
  return (
    <CardWrapper
      headerText='You have successfully registered'
      subHeaderText='You can now login to the app'
      action={() => router.push('/login')}
      actionLabel='Go to login page'
      headerIcon={FaCheckCircle}
    />
  );
};

export default RegisterSuccessPage;
