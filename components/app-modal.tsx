import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/lib/next-ui';
import { ReactNode } from 'react';

type AppModalProps = {
  isOpen: boolean;
  onClose: () => void;
  header?: string;
  body: ReactNode;
  footerButtons?: ButtonProps[];
  imageModal?: boolean;
};

const AppModal = ({
  isOpen,
  header,
  onClose,
  body,
  imageModal,
  footerButtons,
}: AppModalProps) => {
  const handleClose = () => {
    setTimeout(() => onClose(), 10);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      placement='top-center'
      classNames={{
        base: `${imageModal ? 'border-2 border-white' : ''}`,
        body: `${imageModal ? 'p-0' : ''}`,
      }}
      motionProps={{
        variants: {
          enter: { y: 0, opacity: 100, transition: { duration: 0.3 } },
          exit: { y: 100, opacity: 0, transition: { duration: 0.3 } },
        },
      }}
    >
      <ModalContent>
        {!imageModal && (
          <ModalHeader className='flex flex-col gap-1 text-gray-700'>
            {header}
          </ModalHeader>
        )}
        <ModalBody className='text-stone-600'>{body}</ModalBody>
        {!imageModal && (
          <ModalFooter>
            {footerButtons?.map((props: ButtonProps, i) => (
              <Button {...props} key={i}>
                {props.children}
              </Button>
            ))}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AppModal;
