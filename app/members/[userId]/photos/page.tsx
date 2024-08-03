import { getPhotosByUserId } from '@/actions/memberActions';
import MemberPhoto from '@/components/member-photo';
import { CardBody, CardHeader, Divider, Image } from '@/lib/next-ui';

import { notFound } from 'next/navigation';

const PhotosPage = async ({ params }: { params: { userId: string } }) => {
  const photos = await getPhotosByUserId(params.userId);

  return (
    <>
      <CardHeader className='text-2xl font-semibold text-secondary '>
        Photos
      </CardHeader>
      <Divider />
      <CardBody>
        {/* <div>
          {photos &&
            photos.map((photo) => (
              <div key={photo.id}>
                <Image
                  width={300}
                  height={300}
                  src={photo.url}
                  alt='Image of member'
                  className='object-cover aspect-square '
                />
              </div>
            ))}
        </div> */}
        <MemberPhoto photos={photos} />
      </CardBody>
    </>
  );
};

export default PhotosPage;
