'use client';

import { GroupHeader } from './group-header';
import { GroupCard } from './group-card';
import { UserInfo } from '@/server/entities/models/user';
import { GroupWithMembers } from '@/server/entities/models/group';

type GroupListProps = {
  groups: GroupWithMembers[];
  currentUser: UserInfo;
};

export const GroupList = ({ groups, currentUser }: GroupListProps) => {
  return (
    <div className="flex flex-col gap-4">
      <GroupHeader currentUser={currentUser} />
      <div className="flex flex-col items-center gap-4">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
};
