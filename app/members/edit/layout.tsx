import { getMemberByUserId } from '@/actions/memberActions';

import MemberSidebar from '../member-sidebar';

import { notFound } from 'next/navigation';
import { getAuthUserId } from '@/actions/auth-actions';
import { Card } from '@/lib/next-ui';

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const userId = (await getAuthUserId()) as string;

  const member = await getMemberByUserId(userId);
  if (!member) return notFound();

  const basePath = `/members/edit`;
  const navLinks = [
    { name: 'Edit Profile', href: `${basePath}` },
    { name: 'Update Photos', href: `${basePath}/photos` },
  ];

  return (
    <div className='grid grid-cols-12 gap-5 h-[80vh] '>
      <div className='col-span-3 '>
        <MemberSidebar member={member} navLinks={navLinks} />
      </div>
      <div className='col-span-9 '>
        <Card className='w-full mt-10 h-[80vh]'>{children} </Card>
      </div>
    </div>
  );
}
