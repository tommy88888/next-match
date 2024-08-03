import { getMemberByUserId } from '@/actions/memberActions';
import CardInnerWrapper from '@/components/card-inner-wrapper';

const MemberDetailsPage = async ({
  params,
}: {
  params: { userId: string };
}) => {
  const member = await getMemberByUserId(params.userId);
  if (!member) return null;

  return (
    <CardInnerWrapper header='Profile' body={<div>{member.description}</div>} />
  );
};

export default MemberDetailsPage;
