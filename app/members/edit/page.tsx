import EditForm from './edit-form';
import { getAuthUserId } from '@/actions/auth-actions';
import { getMemberByUserId } from '@/actions/memberActions';
import { CardBody, CardHeader, Divider, user } from '@/lib/next-ui';

import { notFound } from 'next/navigation';

const MemberEditPage = async () => {
  const userId = (await getAuthUserId()) as string;

  const member = await getMemberByUserId(userId);
  if (!member) return notFound();

  return (
    <>
      <CardHeader className='text-2xl font-semibold text-secondary '>
        Profile
      </CardHeader>
      <Divider />
      <CardBody>
        {/* {member ? <EditForm member={member} /> : <MemberForm user={user} />} */}
        <EditForm member={member} />
      </CardBody>
    </>
  );
};

export default MemberEditPage;
