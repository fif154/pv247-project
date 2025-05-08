import { auth } from '@/auth';
import { GroupList } from '@/components/groups/group-list';

const Page = async () => {
  const userSession = await auth();
  const currentUser = {
    id: userSession?.user.id ?? '',
    email: userSession?.user.email ?? '',
  };
  return <GroupList currentUser={currentUser} />;
};

export default Page;
