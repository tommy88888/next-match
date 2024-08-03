import { Card, CardHeader, CardBody, Button, CardFooter } from '@/lib/next-ui';

import { IconType } from 'react-icons/lib';

type CardWrapperProps = {
  body?: React.ReactNode;
  headerIcon: IconType;
  headerText: string;
  subHeaderText?: string;
  action?: () => void;
  actionLabel?: string;
  footer?: React.ReactNode;
};

const CardWrapper = ({
  body,
  headerIcon: Icon,
  headerText,
  subHeaderText,
  action,
  footer,
  actionLabel,
}: CardWrapperProps) => {
  return (
    <div className='flex items-center justify-center vertical-center '>
      <Card className='w-2/5 mx-auto p-5'>
        <CardHeader className='flex flex-col items-center justify-center'>
          <div className='flex flex-col gap-2 items-center text-secondary'>
            <div className='flex flex-row gap-3 items-center'>
              <Icon size={30} />
              <h1 className='text-2xl font-semibold text-nowrap'>
                {headerText}
              </h1>
            </div>
            {subHeaderText && (
              <p className='text-neutral-500 '>{subHeaderText}</p>
            )}
          </div>
        </CardHeader>
        {body && <CardBody>{body}</CardBody>}
        <CardFooter>
          {action && (
            <Button
              onClick={action}
              fullWidth
              color='secondary'
              variant='bordered'
            >
              {actionLabel}
            </Button>
          )}
          {footer && <>{footer}</>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardWrapper;
