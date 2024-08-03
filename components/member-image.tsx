'use client';

import { ImCheckmark, ImCross } from 'react-icons/im';
import { CldImage } from 'next-cloudinary';
import { useRole } from '@/hooks/use-role';
import { Button, cn, Image, useDisclosure } from '@/lib/next-ui';
import { Photo } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { approvePhoto, rejectPhoto } from '@/actions/admin-actions';
import AppModal from './app-modal';

type MemberImageProps = {
  photo: Photo | null;
};

const MemberImage = ({ photo }: MemberImageProps) => {
  const role = useRole();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!photo) return null;

  const approve = async (photoId: string) => {
    try {
      await approvePhoto(photoId);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const reject = async (photo: Photo) => {
    try {
      await rejectPhoto(photo);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <div className='cursor-pointer' onClick={onOpen}>
      {photo?.publicId ? (
        <CldImage
          alt='Image of member'
          src={photo.publicId}
          width={300}
          height={300}
          crop='fill'
          gravity='faces'
          className={cn(
            'rounded-2xl',
            !photo.isApproved && role !== 'ADMIN' && 'opacity-40'
          )}
          priority
        />
      ) : (
        <Image
          width={220}
          height={220}
          src={photo?.url || '/images/user.png'}
          alt='Image of user'
        />
      )}
      {!photo?.isApproved && role !== 'ADMIN' && (
        <div className='absolute bottom-2 w-full bg-slate-200 p-1 '>
          <div className='flex justify-center text-danger/50 text-sm font-semibold text-nowrap'>
            Awaiting approval
          </div>
        </div>
      )}
      {role === 'ADMIN' && (
        <div className='flex flex-row gap-2 mt-2 '>
          <Button
            color='success'
            variant='bordered'
            size='sm'
            fullWidth
            onClick={() => approve(photo.id)}
          >
            <ImCheckmark size={16} />
          </Button>
          <Button
            color='danger'
            variant='bordered'
            size='sm'
            fullWidth
            onClick={() => reject(photo)}
          >
            <ImCross size={16} />
          </Button>
        </div>
      )}
      <AppModal
        imageModal={true}
        isOpen={isOpen}
        onClose={onClose}
        body={
          <>
            {photo?.publicId ? (
              <CldImage
                alt='Image of member'
                src={photo.publicId}
                width={750}
                height={750}
                className={cn(
                  'rounded-2xl',
                  !photo.isApproved && role !== 'ADMIN' && 'opacity-40'
                )}
                priority
              />
            ) : (
              <Image
                width={750}
                height={750}
                src={photo?.url || '/images/user.png'}
                alt='Image of user'
              />
            )}
          </>
        }
      />
    </div>
  );
};

export default MemberImage;
