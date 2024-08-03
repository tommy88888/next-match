'use client';

type ButtonAnimatedProps = {
  children: React.ReactNode;
};

const ButtonAnimated = ({ children }: ButtonAnimatedProps) => {
  return (
    <button
      type='button'
      className='relative overflow-hidden rounded-md border border-transparent p-3 m-6 min-w-[120px] text-center group cursor-pointer'
    >
      {/* The sliding background */}
      <span className='absolute inset-0 bg-sky-500 z-0 animate-slide' />

      <span className='relative z-10 text-white'>{children}</span>
    </button>
  );
};

export default ButtonAnimated;
