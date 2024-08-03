'use client';

import { transformImageUrl } from '@/lib/utils';
import { MessageDto } from '@/types';
import { Image } from '@/lib/next-ui';
import Link from 'next/link';

type NewMessageToastProps = {
  message: MessageDto;
};

const NewMessageToast = ({ message }: NewMessageToastProps) => {
  return (
    <Link
      href={`/members/${message.senderId}/chat`}
      className='flex items-center '
    >
      <div className='mr-2'>
        <Image
          src={transformImageUrl(message.senderImage) || '/image/user.png'}
          height={50}
          width={50}
          alt='sender image'
        />
      </div>
      <div className='flex flex-grow flex-col justify-center '>
        <div className='font-semibold '>
          {message.senderName} sent you a message
        </div>
        <div className='text-sm '>Click to View</div>
      </div>
    </Link>
  );
};

export default NewMessageToast;

// export const newMessageToast = (message: MessageDto) => {
//   toast(<NewMessageToast message={message} />);
// };
