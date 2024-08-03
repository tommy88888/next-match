'use client';

import usePresenceStore from '@/hooks/use-presence-store';
import { Avatar, Badge } from '@/lib/next-ui';

type PresenceAvatarProps = {
  userId?: string;
  src?: string | null;
};

const PresenceAvatar = ({ userId, src }: PresenceAvatarProps) => {
  const { members } = usePresenceStore((state) => ({
    members: state.members,
  }));

  const isOnline = userId && members.indexOf(userId) !== -1;

  return (
    <Badge content='' color='success' shape='circle' isInvisible={!isOnline}>
      <Avatar src={src || '/image/user.png'} alt='User avatar' />
    </Badge>
  );
};

export default PresenceAvatar;
