import { auth } from '@/auth';
import { CreateGroupModal } from '@/components/groups/create-group-modal';
import { GroupList } from '@/components/groups/group-list';

const Page = async () => {
  const userSession = await auth();
  const currentUser = {
    id: userSession?.user.id ?? '',
    email: userSession?.user.email ?? '',
  };
  return (
    <div className="flex flex-col h-screen gap-4">
      <div className="flex gap-6">
        <h1 className="text-4xl font-bold">Groups</h1>
        <CreateGroupModal currentUser={currentUser} />
      </div>
      <GroupList currentUser={currentUser} />
    </div>
  );
};

export default Page;
