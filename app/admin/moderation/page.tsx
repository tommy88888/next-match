import { getUnapprovedPhotos } from '@/actions/admin-actions';

// import ClientSession from '@/components/client-session';
import MemberPhoto from '@/components/member-photo';
import { Divider } from '@/lib/next-ui';

export const dynamic = 'force-dynamic';

const AdminPhotoModerationPage = async () => {
  const photos = await getUnapprovedPhotos();

  return (
    <div>
      <h3>Photos awaiting moderation</h3>
      <Divider />
      {/* <ClientSession /> */}
      <MemberPhoto photos={photos} />
    </div>
  );
};

export default AdminPhotoModerationPage;
