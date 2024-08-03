import { signIn } from 'next-auth/react';
import { Button } from '@/lib/next-ui';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

type SocialLoginProps = {};

const SocialLogin = () => {
  const onClick = (provider: 'google' | 'github') => {
    signIn();
  };
  return (
    <div className='flex items-center w-full gap-2 '>
      <Button
        size='lg'
        fullWidth
        variant='bordered'
        onClick={() => onClick('google')}
      >
        <FcGoogle size={20} />
      </Button>
      <Button
        size='lg'
        fullWidth
        variant='bordered'
        onClick={() => onClick('github')}
      >
        <FaGithub size={20} />
      </Button>
    </div>
  );
};

export default SocialLogin;
