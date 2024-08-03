'use client';

import { useMessageStore } from '@/hooks/use-message-store';
import { NavbarItem } from '@/lib/next-ui';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  href: string;
  label: string;
};

const NavLink = ({ href, label }: NavLinkProps) => {
  const pathname = usePathname();

  const { unreadCount } = useMessageStore((state) => ({
    unreadCount: state.unreadCount,
  }));
  return (
    <NavbarItem isActive={pathname === href} as={Link} href={href} className=''>
      <span>{label}</span>
      {href === '/messages' && unreadCount > 0 && (
        <span className='ml-1'>({unreadCount})</span>
      )}
    </NavbarItem>
  );
};

export default NavLink;
