// 'use client';

// import { MessageDto } from '@/types';
// import MessageBox from './message-box';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import { pusherClient } from '@/lib/pusher';
// import { formatShortDateTime } from '@/lib/utils';
// import { Channel } from 'pusher-js';
// import { useMessageStore } from '@/hooks/use-message-store';

// type MessageListProps = {
//   initialMessages: { messages: MessageDto[]; readCount: number };
//   currentUserId: string;
//   chatId: string;
// };

// const MessageList = ({
//   initialMessages,
//   currentUserId,
//   chatId,
// }: MessageListProps) => {
//   const setReadCount = useRef(false);
//   const [messages, setMessages] = useState(initialMessages.messages);
//   const { updateUnreadCount } = useMessageStore((state) => ({
//     updateUnreadCount: state.updateUnreadCount,
//   }));

//   useEffect(() => {
//     if (!setReadCount.current) {
//       updateUnreadCount(-initialMessages.readCount);
//       setReadCount.current = true;
//     }
//   }, [initialMessages.readCount, updateUnreadCount]);

//   const channelRef = useRef<Channel | null>(null);

//   const handleNewMessage = useCallback(
//     (message: MessageDto) => {
//       setMessages((prev) => {
//         return [...prev, message];
//       });
//     },
//     [setMessages]
//   );

//   const handleReadMessages = useCallback(
//     (messageIds: string[]) => {
//       setMessages((prev) =>
//         prev.map((message) =>
//           messageIds.includes(message.id)
//             ? { ...message, dateRead: formatShortDateTime(new Date()) }
//             : message
//         )
//       );
//     },
//     [setMessages]
//   );

//   useEffect(() => {
//     if (channelRef.current) {
//       channelRef.current = pusherClient.subscribe(chatId);

//       channelRef.current.bind('message:new', handleNewMessage);
//       channelRef.current.bind('messages:read', handleReadMessages);
//     }

//     return () => {
//       if (channelRef.current && channelRef.current.subscribed) {
//         channelRef.current.unsubscribe();
//         channelRef.current.unbind('message:new', handleNewMessage);
//         channelRef.current.unbind('messages:read', handleReadMessages);
//       }
//     };
//   }, [chatId, handleNewMessage, handleReadMessages]);

//   return (
//     <div>
//       {messages.length === 0 ? (
//         'no message'
//       ) : (
//         <div>
//           {messages.map((message) => (
//             <MessageBox
//               key={message.id}
//               message={message}
//               currentUserId={currentUserId}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageList;

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { pusherClient } from '@/lib/pusher';
import { useMessageStore } from '@/hooks/use-message-store';
import MessageBox from './message-box';
import { MessageDto } from '@/types';
import { Channel } from 'pusher-js';

type MessageListProps = {
  initialMessages: { messages: MessageDto[]; readCount: number };
  currentUserId: string;
  chatId: string;
};

const MessageList = ({
  initialMessages,
  currentUserId,
  chatId,
}: MessageListProps) => {
  const [messages, setMessages] = useState(initialMessages.messages);

  const updateUnreadCount = useMessageStore((state) => state.updateUnreadCount);
  const channelRef = useRef<Channel | null>(null);

  useEffect(() => {
    updateUnreadCount(-initialMessages.readCount);
  }, [initialMessages.readCount, updateUnreadCount]);

  const handleNewMessage = useCallback((message: MessageDto) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const handleReadMessages = useCallback((messageIds: string[]) => {
    setMessages((prev) =>
      prev.map((message) =>
        messageIds.includes(message.id)
          ? { ...message, dateRead: new Date().toISOString() }
          : message
      )
    );
  }, []);

  useEffect(() => {
    channelRef.current = pusherClient.subscribe(chatId);
    channelRef.current.bind('message:new', handleNewMessage);
    channelRef.current.bind('messages:read', handleReadMessages);

    return () => {
      if (channelRef.current) {
        channelRef.current.unbind('message:new', handleNewMessage);
        channelRef.current.unbind('messages:read', handleReadMessages);
        channelRef.current.unsubscribe();
      }
    };
  }, [chatId, handleNewMessage, handleReadMessages]);

  return (
    <div>
      {messages.length === 0 ? (
        'No messages'
      ) : (
        <div>
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageList;
