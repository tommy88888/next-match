'use client';

import PresenceAvatar from '@/components/presence-avatar';
import { truncateString } from '@/lib/utils';
import { MessageDto } from '@/types';
import { Button, ButtonProps, useDisclosure } from '@/lib/next-ui';

import { AiFillDelete } from 'react-icons/ai';
import AppModal from '@/components/app-modal';

type MessageTableCellProps = {
  item: MessageDto;
  columnKey: string;
  isOutbox: boolean;
  deleteMessage: (message: MessageDto) => void;
  isDeleting: boolean;
  imageModal?: boolean;
};

const MessageTableCell = ({
  item,
  columnKey,
  isOutbox,
  deleteMessage,
  isDeleting,
  imageModal,
}: MessageTableCellProps) => {
  const cellValue = item[columnKey as keyof MessageDto];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onConfirmDeleteMessage = () => {
    deleteMessage(item);
  };
  const footerButtons: ButtonProps[] = [
    { color: 'default', onClick: onClose, children: 'Cancel' },
    {
      color: 'secondary',
      onClick: onConfirmDeleteMessage,
      children: 'Confirm',
    },
  ];

  switch (columnKey) {
    case 'recipientName':
    case 'senderName':
      return (
        <div className='flex items-center gap-2 cursor-pointer'>
          <PresenceAvatar
            userId={isOutbox ? item.recipientId : item.senderId}
            src={isOutbox ? item.recipientImage : item.senderImage}
          />
          <span>{cellValue}</span>
        </div>
      );
    case 'text':
      return <div>{truncateString(cellValue, 20)}</div>;

    case 'created':
      return <div>{cellValue}</div>;
    default:
      return (
        <>
          <Button
            isIconOnly
            variant='light'
            onClick={() => onOpen()}
            isLoading={isDeleting}
          >
            <AiFillDelete size={24} className='text-danger ' />
          </Button>

          <AppModal
            isOpen={isOpen}
            onClose={onClose}
            header='Please Confirm this action'
            body={
              <div>
                Are you sure u want do delete this? deletion can not be undone
              </div>
            }
            footerButtons={footerButtons}
          />
        </>
      );
  }
};
export default MessageTableCell;
