'use client';

import { getAuthUserId, logOut } from '@/actions/auth-actions';
import { getMemberByUserId } from '@/actions/memberActions';
import { transformImageUrl } from '@/lib/utils';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Avatar,
} from '@/lib/next-ui';

import Link from 'next/link';

type UserMenuProps = {
  user: { name: string | null; image: string | null } | null;
};

const UserMenu = ({ user }: UserMenuProps) => {
  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <Avatar
          isBordered
          as='button'
          className='transition-transform '
          color='secondary'
          name={user?.name || 'user avatar'}
          size='sm'
          src={transformImageUrl(user?.image) || '/img/iron.svg'}
        />
      </DropdownTrigger>
      <DropdownMenu variant='flat' aria-label='User actions menu'>
        <DropdownSection showDivider>
          <DropdownItem
            isReadOnly
            as='span'
            className='h-14 flex flex-row text-gray-600'
            aria-label='username'
          >
            Sign in as {user?.name}
          </DropdownItem>
        </DropdownSection>

        <DropdownItem as={Link} href='/members/edit' className='text-gray-600 '>
          Edit Profile
        </DropdownItem>

        <DropdownItem
          as={Link}
          href='/admin/moderation'
          className='text-gray-600 '
        >
          photo moderation
        </DropdownItem>

        <DropdownItem
          color='danger'
          onClick={async () => logOut()}
          className='text-gray-600 '
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
      UserMenu
    </Dropdown>
  );
};

export default UserMenu;
