'use client';

import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai';
import { PiSpinnerGap } from 'react-icons/pi';

type DeleteButtonProps = { loading: boolean };

const DeleteButton = ({ loading }: DeleteButtonProps) => {
  return (
    <div className='relative hover:opacity-80 transition cursor-pointer '>
      {!loading ? (
        <>
          <AiOutlineDelete
            size={32}
            className='fill-white absolute -top-[2px] -right-[2px] '
          />
          <AiFillDelete size={28} className='fill-red-600' />
        </>
      ) : (
        <PiSpinnerGap size={32} className='fill-white animate-spin' />
      )}
    </div>
  );
};

export default DeleteButton;
