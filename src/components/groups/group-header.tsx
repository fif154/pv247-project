import { User } from 'next-auth';
import { PageHeader } from '../page-header';
import { CreateGroupButton } from './create-group-modal/create-group-button';

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
