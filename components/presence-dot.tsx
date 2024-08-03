'use client';

import usePresenceStore from '@/hooks/use-presence-store';
import { Member } from '@prisma/client';
import { GoDot, GoDotFill } from 'react-icons/go';

type PresenceDotProps = {
  member: Member;
};

const PresenceDot = ({ member }: PresenceDotProps) => {
  const { members } = usePresenceStore((state) => ({
    members: state.members,
  }));

  const isOnline = members.indexOf(member.userId) !== -1;
  if (!isOnline) return null;

  return (
    <>
      <GoDot
        size={36}
        className='fill-white absolute -top-[2px] -right-[2px] '
      />
      <GoDotFill size={32} className='fill-green-500 animate-pulse' />
    </>
  );
};

export default PresenceDot;
