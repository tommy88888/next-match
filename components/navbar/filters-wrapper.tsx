'use client';

import { usePathname } from 'next/navigation';
import Filters from './filters';

const FiltersWrapper = () => {
  const pathname = usePathname();

  if (pathname === '/members') return <Filters />;
  else return null;
};

export default FiltersWrapper;
