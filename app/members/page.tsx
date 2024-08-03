import PaginationComponent from '@/components/pagination-component';
import { getMembers } from '../../actions/memberActions';
import MemberCard from './member-card';
import { fetchCurrentUserLikeIds } from '@/actions/like-actions';
import { GetMemberParams, UserFilters } from '@/types';

const MembersPage = async ({
  searchParams,
}: {
  searchParams: GetMemberParams;
}) => {
  const { items: members, totalCount } = await getMembers(searchParams);
  const likeIds = await fetchCurrentUserLikeIds();
  return (
    <>
      <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-8'>
        {members &&
          members.map((user) => (
            <MemberCard likeIds={likeIds} key={user.id} member={user} />
          ))}
      </div>
      <PaginationComponent totalCount={totalCount} />
    </>
  );
};

export default MembersPage;
