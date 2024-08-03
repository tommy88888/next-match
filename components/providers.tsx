'use client';

import { getUnreadMessageCount } from '@/actions/message-actions';
import { useMessageStore } from '@/hooks/use-message-store';
import { useNotificationChannel } from '@/hooks/use-notification-channel';
import { usePresenceChannel } from '@/hooks/use-presence-channel';

import { NextUIProvider } from '@/lib/next-ui';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';
// import { SessionProvider } from 'next-auth/react';

type ProvidersProps = {
  userId: string | null;
  children: React.ReactNode;
  profileComplete: boolean;
};

const Providers = ({ children, userId, profileComplete }: ProvidersProps) => {
  // const [mess, setMess] = useState<number>(0);
  const isUnreadCountSet = useRef(false);
  const { updateUnreadCount } = useMessageStore((state) => ({
    updateUnreadCount: state.updateUnreadCount,
  }));

  const setUnreadCount = useCallback(
    (amount: number) => {
      updateUnreadCount(amount);
    },
    [updateUnreadCount]
  );

  useEffect(() => {
    if (!isUnreadCountSet.current && userId) {
      getUnreadMessageCount().then((count) => setUnreadCount(count));
      isUnreadCountSet.current = true;
    }
  }, [setUnreadCount, userId]);

  usePresenceChannel(userId, profileComplete);
  useNotificationChannel(userId, profileComplete);
  return (
    <SessionProvider>
      <NextUIProvider>
        <ToastContainer
          position='bottom-center'
          hideProgressBar
          className='z-50'
        />
        {children}
      </NextUIProvider>
    </SessionProvider>
  );
};

export default Providers;
