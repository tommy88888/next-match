import CardInnerWrapper from '@/components/card-inner-wrapper';

import { notFound } from 'next/navigation';
import ChatForm from './chat-form';
import { getMessageThread } from '@/actions/message-actions';

import { getAuthUserId } from '@/actions/auth-actions';
import MessageList from './message-list';
import { createChatId } from '@/lib/utils';

const ChatPage = async ({ params }: { params: { userId: string } }) => {
  const userId = await getAuthUserId();
  if (!userId) return notFound();

  const messages = await getMessageThread(params.userId);
  const chatId = createChatId(userId, params.userId);

  return (
    <CardInnerWrapper
      header='Chat'
      body={
        <MessageList
          initialMessages={messages}
          currentUserId={userId}
          chatId={chatId}
        />
      }
      footer={<ChatForm />}
    />
  );
};

export default ChatPage;
