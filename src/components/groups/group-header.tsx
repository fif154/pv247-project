import { UserInfo } from '@/server/entities/models/user';
import { CreateGroupButton } from './create-group-modal/create-group-button';
import { PageHeader } from '../page-header';

type GroupHeaderProps = {
  currentUser: UserInfo;
};

export const GroupHeader = ({ currentUser }: GroupHeaderProps) => {
  return (
    <>
      <div className="flex justify-between gap-6">
        <PageHeader>Groups</PageHeader>
        <CreateGroupButton currentUser={currentUser} />
      </div>
    </>
  );
};
