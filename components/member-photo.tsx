'use client';

import { useState } from 'react';
import { Photo } from '@prisma/client';
import DeleteButton from './delete-button';
import MemberImage from './member-image';
import StarButton from './star-button';
import { useRouter } from 'next/navigation';
import { deleteImage, setMainImage } from '@/actions/user-actions';
import { toast } from 'react-toastify';
import { error } from 'console';

type MemberPhotoProps = {
  photos?: Photo[] | null;
  editing?: boolean;
  mainImageUrl?: string | null;
};

const MemberPhoto = ({ photos, editing, mainImageUrl }: MemberPhotoProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState({
    type: '',
    isLoading: false,
    id: '',
  });

  const onSetMain = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return null;
    setLoading({ isLoading: true, id: photo.id, type: 'main' });

    try {
      await setMainImage(photo);
      router.refresh();
      setLoading({ isLoading: false, id: '', type: '' });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading({ isLoading: false, id: '', type: '' });
    }
  };

  const onDelete = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return null;
    setLoading({ isLoading: true, id: photo.id, type: 'delete' });
    await deleteImage(photo);
    router.refresh();
    setLoading({ isLoading: false, id: '', type: '' });
  };

  return (
    <div className='grid grid-cols-5 gap-3 p-5 '>
      {photos?.map((p) => (
        <div key={p.id} className='relative'>
          <MemberImage photo={p} />
          {editing && (
            <>
              <div
                onClick={() => onSetMain(p)}
                className='absolute top-3 left-3 z-50 '
              >
                <StarButton
                  selected={p.url === mainImageUrl}
                  loading={
                    loading.isLoading &&
                    loading.type === 'main' &&
                    loading.id === p.id
                  }
                />
              </div>
              <div
                onClick={() => onDelete(p)}
                className='absolute top-3 right-3 z-50 '
              >
                <DeleteButton
                  loading={
                    loading.isLoading &&
                    loading.type === 'delete' &&
                    loading.id === p.id
                  }
                />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MemberPhoto;
