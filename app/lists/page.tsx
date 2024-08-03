import {
  fetchCurrentUserLikeIds,
  fetchLikedMembers,
} from '@/actions/like-actions';
import ListsTab from './lists-tab';

export const dynamic = 'force-dynamic';

type ListsPageProps = {
  searchParams: { type: string };
};

const ListsPage = async ({ searchParams }: ListsPageProps) => {
  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(searchParams.type);
  return (
    <div>
      <ListsTab members={members} likeIds={likeIds} />
    </div>
  );
};

export default ListsPage;
