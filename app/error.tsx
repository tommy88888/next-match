'use client'; // Error components must be Client Components

import { BiSolidError } from 'react-icons/bi';
import { Button } from '@/lib/next-ui';
import { Card, CardBody, CardFooter, CardHeader } from '@/lib/next-ui';
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.error(error);
  // }, [error]);

  return (
    <div className='flex items-center justify-center vertical-center '>
      <Card className='w-2/5 mx-auto '>
        <CardHeader className='flex flex-col items-center justify-center '>
          <div className='flex flex-row gap-2 items-center  text-secondary'>
            <BiSolidError size={30} />
            <h1 className='text-3xl font-semibold'>Error</h1>
          </div>
        </CardHeader>
        <CardBody>
          <div className='flex justify-center text-danger '>
            {error.message}
          </div>
        </CardBody>
        <CardFooter className='flex justify-center '>
          <Button onClick={() => reset()} color='secondary' variant='bordered'>
            Try Again
          </Button>
        </CardFooter>
      </Card>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
