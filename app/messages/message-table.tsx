'use client';

import { MessageDto } from '@/types';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Card,
} from '@/lib/next-ui';
import MessageTableCell from './message-table-cell';
import { useMessages } from '@/hooks/use-messages';

type MessageTableProps = {
  initialMessages: MessageDto[];
  nextCursor?: string;
};

const MessageTable = ({ initialMessages, nextCursor }: MessageTableProps) => {
  const {
    isOutbox,
    columns,
    deleteMessage,
    selectRow,
    isDeleting,
    messages,
    loadMore,
    loadingMore,
    hasMore,
  } = useMessages(initialMessages, nextCursor);

  return (
    <div className='flex flex-col h-[80vh]'>
      <Card>
        <Table
          aria-label='Table with messages'
          selectionMode='single'
          onRowAction={(key) => selectRow(key)}
          shadow='none'
          className='flex flex-col gap-3 h-[80vh] overflow-auto'
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                width={column.key === 'text' ? '50%' : undefined}
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={messages}
            emptyContent='no messages for this container'
          >
            {(item) => (
              <TableRow key={item.id} className='cursor-pointer '>
                {(columnKey) => (
                  <TableCell
                    className={`${
                      !item.dateRead && !isOutbox
                        ? 'font-extrabold text-orange-900'
                        : ''
                    }`}
                  >
                    <MessageTableCell
                      item={item}
                      columnKey={columnKey as string}
                      isOutbox={isOutbox}
                      deleteMessage={deleteMessage}
                      isDeleting={
                        isDeleting.loading && isDeleting.id === item.id
                      }
                    />
                    {/* <pre>{JSON.stringify(item, null, 3)}</pre> */}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className='sticky bottom-0 pb-3 text-right '>
          <Button
            color='secondary'
            isLoading={loadingMore}
            isDisabled={!hasMore}
            onClick={loadMore}
          >
            {hasMore ? 'Load more' : 'No more messages'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default MessageTable;
