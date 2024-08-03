'use client';

import { Spinner } from '@/lib/next-ui';

const Loading = () => {
  return (
    <div className='flex justify-center items-center vertical-center h-full'>
      <Spinner label='Loading...' color='secondary' labelColor='secondary' />
    </div>
  );
};

export default Loading;
