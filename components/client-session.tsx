'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/lib/next-ui';
import { Session } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import { FaRegSmile } from 'react-icons/fa';

type ClientSessionProps = {};

const ClientSession = () => {
  const { data: sessionData, status } = useSession();
  const [userSession, setUserSession] = useState<Session | null>(null);

  useEffect(() => {
    if (status === 'authenticated') {
      setUserSession(sessionData); // Use sessionData which is of type Session | null
    } else {
      setUserSession(null); // Clear userSession when not authenticated
    }
  }, [sessionData, status]); // Dependency array includes sessionData and status

  return (
    <div className='bg-sky-50 p-10 rounded-xl shadow-md w-1/2 overflow-auto '>
      <h3 className='text-2xl font-semibold '>Client Session data:</h3>

      {userSession ? (
        <div>
          <pre>{JSON.stringify(userSession, null, 2)}</pre>
          <form
            action={async () => {
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
  );
};

export default ClientSession;
