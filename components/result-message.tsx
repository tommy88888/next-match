'use client';

import { ActionResult } from '@/types';
import clsx from 'clsx';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

type ResultMessageProps = {
  result: ActionResult<string> | null;
};

const ResultMessage = ({ result }: ResultMessageProps) => {
  if (!result) return null;
  return (
    <div
      className={clsx(
        'p-3 rounded-xl w-full flex items-center justify-center gap-x-2 text-sm',
        {
          'text-danger-800 bg-danger-50': result.status === 'error',
          'text-success-800 bg-success-50': result.status === 'success',
        }
      )}
    >
      {result.status === 'success' ? (
        <FaCheckCircle size={20} />
      ) : (
        <FaExclamationTriangle size={20} />
      )}
      <p>
        {result.status === 'success' ? result.data : (result.error as string)}
      </p>
    </div>
  );
};

export default ResultMessage;
