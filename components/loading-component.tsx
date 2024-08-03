'use client';

import { Spinner } from '@/lib/next-ui';

type LoadingComponentProps = {
  label?: string;
};

const LoadingComponent = ({ label }: LoadingComponentProps) => {
  return (
    <div className='flex justify-center items-center vertical-center'>
      <Spinner
        label={label || 'Loading...'}
        color='secondary'
        labelColor='secondary'
      />
    </div>
  );
};

export default LoadingComponent;
