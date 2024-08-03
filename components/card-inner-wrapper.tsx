'use client';

import { ReactNode } from 'react';

import { CardHeader, CardBody, CardFooter, Divider } from '@/lib/next-ui';

type CardInnerWrapperProps = {
  header: ReactNode | string;
  body: ReactNode;
  footer?: ReactNode;
};

const CardInnerWrapper = ({ header, body, footer }: CardInnerWrapperProps) => {
  return (
    <>
      <CardHeader className='flex flex-row justify-between items-center'>
        {typeof header === 'string' ? (
          <div className='text-2xl font-semibold text-secondary '>{header}</div>
        ) : (
          <>{header}</>
        )}
      </CardHeader>
      <Divider />
      <CardBody>{body}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </>
  );
};

export default CardInnerWrapper;
