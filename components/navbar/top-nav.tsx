import Link from 'next/link';
import { GiMatchTip } from 'react-icons/gi';

import { Navbar, NavbarBrand, NavbarContent, Button } from '@/lib/next-ui';
import { auth } from '@/auth';
import UserMenu from './user-menu';
import NavLink from './nav-link';

import { getUserInfoForNav } from '@/actions/user-actions';

import FiltersWrapper from './filters-wrapper';
import ClientOnly from '@/lib/client-only';
import BarLoaderSpinner from '../bar-loader-spinner';

const TopNav = async () => {
  const session = await auth();

  const userInfo = session?.user && (await getUserInfoForNav());

  const memberLinks = [
    { href: '/members', label: 'Matches' },
    { href: '/lists', label: 'Lists' },
    { href: '/messages', label: 'Messages' },
  ];

  const adminLinks = [{ href: '/admin/moderation', label: 'Photo Moderation' }];

  const links = session?.user.role === 'ADMIN' ? adminLinks : memberLinks;

  const loading = false;

  return (
    <ClientOnly>
      <Navbar
        maxWidth='xl'
        className='bg-gradient-to-r from-purple-400 to-purple-700'
        classNames={{
          item: [
            'text-xl',
            'text-white',
            'uppercase',
            'data-[active=true]:text-yellow-200',
            'data-[active=true]:border-b-4',
            'data-[active=true]:border-solid',
            'data-[active=true]:border-sky-500',
          ],
        }}
      >
        <NavbarBrand as={Link} href='/'>
          <GiMatchTip size={40} className='text-gray-200 ' />
          <div className='font-bold text-3xl flex'>
            <span className='text-gray-900 '>Next</span>
            <span className='text-gray-200 '>Match</span>
          </div>
        </NavbarBrand>
        {/* {session?.user?.id} */}
        <NavbarContent justify='center'>
          {session &&
            links.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
        </NavbarContent>
        <NavbarContent justify='end'>
          {userInfo ? (
            <UserMenu user={userInfo} />
          ) : (
            <>
              <Button
                as={Link}
                href='/login'
                variant='bordered'
                className='text-white '
              >
                Login
              </Button>
              <Button
                as={Link}
                href='/register'
                variant='bordered'
                className='text-white '
              >
                Register
              </Button>
            </>
          )}
        </NavbarContent>
      </Navbar>
      {loading ? (
        <BarLoaderSpinner color='#ff790b' loading={loading} width='100%' />
      ) : (
        <div className='h-1 w-full bg-orange-500' />
      )}
      <FiltersWrapper />
    </ClientOnly>
  );
};

export default TopNav;
