'use server';

import { getMessagesByContainer } from '@/actions/message-actions';
import MessageSidebar from './message-sidebar';
import MessageTable from './message-table';

const MessagesPage = async ({
  searchParams,
}: {
  searchParams: { container: string };
}) => {
  const { messages, nextCursor } = await getMessagesByContainer(
    searchParams.container
  );
  return (
    <div className='grid grid-cols-12 gap-5 h-[80vh] mt-10'>
      <div className='col-span-2 '>
        <MessageSidebar />
      </div>
      <div className='col-span-10 '>
        <MessageTable initialMessages={messages} nextCursor={nextCursor} />
      </div>
    </div>
  );
};

export default MessagesPage;
