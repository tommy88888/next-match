'use client';

import { addImage } from '@/actions/user-actions';
import ImageUploadButton from '@/components/image-upload-button';
import { CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const MemberPhotoUpload = () => {
  const router = useRouter();

  const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info === 'object') {
      await addImage(result.info.secure_url, result.info.public_id);
      router.refresh();
    } else {
      toast.error('Error adding Image');
    }
  };
  return <ImageUploadButton onUploadImage={onAddImage} />;
};

export default MemberPhotoUpload;
