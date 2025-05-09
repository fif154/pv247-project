import { UserInfo } from '@/server/entities/models/user';
import { CreateGroupButton } from './create-group-modal/create-group-button';

type GroupHeaderProps = {
  currentUser: UserInfo;
};

export const GroupHeader = ({ currentUser }: GroupHeaderProps) => {
  return (
    <>
      <div className="flex justify-between gap-6">
        <h1 className="text-4xl font-bold">Groups</h1>
        <CreateGroupButton currentUser={currentUser} />
      </div>
    </>
  );
};
