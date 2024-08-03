import { auth, signOut } from '@/auth';
import ClientSession from '@/components/client-session';

import { Button } from '@/lib/next-ui';
import Link from 'next/link';

import { FaRegSmile } from 'react-icons/fa';
import { GiMatchTip } from 'react-icons/gi';

export default async function Home() {
  const session = await auth();
  return (
    <div className='flex flex-col justify-center items-center mt-20 gap-6 text-secondary'>
      <GiMatchTip size={100} />
      <h1 className='text-4xl font-bold'>Welcome to Next Match</h1>
      {session ? (
        <Button>Continue</Button>
      ) : (
        <div className='flex flex-row gap-4 '>
          <Button
            as={Link}
            href='/login'
            color='secondary'
            size='lg'
            variant='bordered'
            startContent={<FaRegSmile size={20} />}
            className='bg-amber-100 '
          >
            Sign in
          </Button>
          <Button
            as={Link}
            href='/register'
            color='secondary'
            size='lg'
            variant='bordered'
            startContent={<FaRegSmile size={20} />}
            className='bg-amber-100 '
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
}
