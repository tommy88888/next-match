import ClientOnly from '@/lib/client-only';
import RegisterForm from './register-form';

const RegisterPage = () => {
  return (
    <ClientOnly>
      <div className='flex items-center justify-center vertical-center'>
        <RegisterForm />
      </div>
    </ClientOnly>
  );
};

export default RegisterPage;
