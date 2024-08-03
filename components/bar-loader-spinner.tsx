'use client';

import { color } from 'framer-motion';
import { CSSProperties, useState } from 'react';
import BarLoader from 'react-spinners/BarLoader';

type BarLoaderProps = {
  color?: string;
  loading: boolean;
  width: string;
};

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

const BarLoaderSpinner = ({
  color = 'orange',
  loading,
  width,
}: BarLoaderProps) => {
  // const [loading, setLoading] = useState(true);
  // const [color, setColor] = useState('#000');
  return (
    <div className='sweet-loading'>
      {/* <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
      <input
        value={color}
        onChange={(input) => setColor(input.target.value)}
        placeholder='Color of the loader'
      /> */}

      <BarLoader
        width={width}
        color={color}
        loading={loading}
        cssOverride={override}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
};

export default BarLoaderSpinner;
