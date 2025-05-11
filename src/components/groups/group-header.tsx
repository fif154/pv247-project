import { User } from 'next-auth';
import { CreateGroupButton } from './create-group-modal/create-group-button';
import { PageHeader } from '../page-header';

type GroupHeaderProps = {
  currentUser: User;
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
