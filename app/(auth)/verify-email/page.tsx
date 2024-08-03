import { verifyEmail } from '@/actions/auth-actions';
import CardWrapper from '@/components/card-wrapper';
import ResultMessage from '@/components/result-message';
import { CardFooter, Spinner } from '@/lib/next-ui';
import { MdOutlineMailOutline } from 'react-icons/md';

type VerifyEmailPageProps = {};

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  const result = await verifyEmail(searchParams.token);
  return (
    <CardWrapper
      headerText='Verifying your email address'
      headerIcon={MdOutlineMailOutline}
      body={
        <div className='flex flex-col space-y-4 items-center '>
          <div className='flex flex-row items-center '>
            <p>Verifying your email address.Please wait...</p>
            {!result && <Spinner color='secondary' />}
          </div>
        </div>
      }
      footer={<ResultMessage result={result} />}
    />
  );
};

export default VerifyEmailPage;
