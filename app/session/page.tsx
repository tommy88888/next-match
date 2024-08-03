import { auth, signOut } from '@/auth';
import ClientSession from '@/components/client-session';
import { Button } from '@nextui-org/react';
import { FaRegSmile } from 'react-icons/fa';

type SessionPageProps = {};

const SessionPage = async () => {
  const session = await auth();
  return (
    <div className='flex flex-row justify-around mt-20 gap-6'>
      <div className='bg-fuchsia-50 p-10 rounded-xl shadow-md w-1/2 overflow-auto '>
        <h3 className='text-2xl font-semibold '>Server Session data</h3>

        {session ? (
          <div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <form
              action={async () => {
                'use server';

                await signOut();
              }}
            >
              <Button
                type='submit'
                href='/members'
                color='secondary'
                variant='bordered'
                startContent={<FaRegSmile size={20} />}
                className='bg-amber-100 '
              >
                Sign out!!
              </Button>
            </form>
          </div>
        ) : (
          <div>Not Sign In</div>
        )}
      </div>
      <ClientSession />
    </div>
  );
};

export default SessionPage;
