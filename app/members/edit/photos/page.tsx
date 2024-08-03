'use server';

import { getAuthUserId } from '@/actions/auth-actions';
import { getMemberByUserId, getPhotosByUserId } from '@/actions/memberActions';

import MemberPhotoUpload from './member-photo-upload';

import MemberPhoto from '@/components/member-photo';
import { CardBody, CardHeader, Divider } from '@/lib/next-ui';

const EditPhotoPage = async () => {
  const userId = await getAuthUserId();
  let member;
  let photos;
  if (userId) {
    member = await getMemberByUserId(userId);
    photos = await getPhotosByUserId(userId);
  }
  // if (!photos) return notFound();
  return (
    <>
      <CardHeader className='flex flex-row justify-between items-center'>
        <div className='text-2xl font-semibold text-secondary '>
          Edit Profile
        </div>
        <MemberPhotoUpload />
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberPhoto
          photos={photos}
          editing={true}
          mainImageUrl={member?.image}
        />
      </CardBody>
    </>
  );
};

export default EditPhotoPage;
