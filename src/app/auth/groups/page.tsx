import { getUserGroupsWithMembersAction } from '@/app/(groups)/actions';
import { auth } from '@/auth';
import { CreateGroupButton } from '@/components/groups/create-group-modal/create-group-button';
import { GroupCard } from '@/components/groups/group-card';
import { GroupHeader } from '@/components/groups/group-header';

const Page = async () => {
  const userSession = await auth();
  const currentUser = {
    id: userSession?.user.id ?? '',
    email: userSession?.user.email ?? '',
  };

  console.log('currentUser', userSession);

  const groups = await getUserGroupsWithMembersAction(currentUser.id);
  return (
    <div className="flex flex-col gap-4">
      <GroupHeader currentUser={currentUser} />
      {groups.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h2 className="text-2xl font-bold">
            You are not member of any group
          </h2>
          <p className="text-gray-500">
            Create a new group and add your friends as group memebers
          </p>
          <CreateGroupButton currentUser={currentUser} />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} currentUser={currentUser} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
