'use client';

import { transformImageUrl } from '@/lib/utils';
import { MessageDto } from '@/types';
import { Image } from '@/lib/next-ui';
import Link from 'next/link';
import { toast } from 'react-toastify';

type NotificationToastProps = {
  image?: string | null;
  href: string;
  title: string;
  subtitle?: string;
};

const NotificationToast = ({
  image,
  href,
  title,
  subtitle,
}: NotificationToastProps) => {
  return (
    <Link href={href} className='flex items-center '>
      <div className='mr-2 '>
        <Image
          src={transformImageUrl(image) || '/images/user.png'}
          height={50}
          width={50}
          alt='Sender image'
        />
      </div>
      <div className='flex flex-grow justify-center '>
        <div className='font-semibold '>{title}</div>
        <div className='text-sm'>{subtitle || 'Click to view'}</div>
      </div>
    </Link>
  );
};

export default NotificationToast;

export const newMessageToast = (message: MessageDto) => {
  toast(
    <NotificationToast
      image={message.senderImage}
      href={`/members/${message.senderId}/chat`}
      title={`${message.senderName} has sent you a new message`}
    />
  );
};

export const newLikeToast = (
  name: string,
  image: string | null,
  userId: string
) => {
  toast(
    <NotificationToast
      image={image}
      href={`/members/${userId}`}
      title={`You have been like by${name}`}
      subtitle='Click here to view their profile'
    />
  );
};
