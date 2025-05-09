import { getUserGroupsWithMembersAction } from '@/app/(groups)/actions';
import { auth } from '@/auth';
import { GroupList } from '@/components/groups/group-list';

const Page = async () => {
  const userSession = await auth();
  const currentUser = {
    id: userSession?.user.id ?? '',
    email: userSession?.user.email ?? '',
  };
  const data = await getUserGroupsWithMembersAction(currentUser.id);
  return <GroupList groups={data ?? []} currentUser={currentUser} />;
};

export default Page;
