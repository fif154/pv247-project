'use client';

import { Card } from '../ui/card';
import { DoorOpen, Pencil, Trash2, User } from 'lucide-react';
import { GroupWithMembers } from '@/server/entities/models/group';
import { RemoveGroupModal } from './remove-group-modal';
import { LeaveGroupModal } from './leave-group-modal';
import { CreateGroupModal } from './create-group-modal/create-group-modal';
import { useState } from 'react';
import { UserInfo } from '@/server/entities/models/user';

type GroupCardProps = {
  group: GroupWithMembers;
  currentUser: UserInfo;
};

export const GroupCard = ({ group, currentUser }: GroupCardProps) => {
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  return (
    <>
      <Card key={group.id} className="flex flex-row w-full p-5">
        <div className="flex flex-col w-full gap-3">
          <div className="flex justify-between w-full">
            <h2 className="text-xl font-bold">{group.name}</h2>
            <div className="flex gap-5">
              <Pencil
                className="cursor-pointer hover:text-gray-500"
                onClick={() => setEditModalOpen(true)}
              />
              <DoorOpen
                className={
                  group.members.length <= 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'cursor-pointer hover:text-blue-500'
                }
                onClick={() => setLeaveModalOpen(true)}
              />
              <Trash2
                className="cursor-pointer hover:text-red-500"
                onClick={() => setRemoveModalOpen(true)}
              />
            </div>
          </div>

          <span>{group.description}</span>
          <div className="flex gap-3 items-center">
            <User />
            {group.members.length} member{group.members.length > 1 && 's'}
          </div>
          <div className="">
            <span className="text-xs text-gray-500">
              Created at {group.createdAt}
            </span>
          </div>
        </div>
      </Card>
      <RemoveGroupModal
        modalOpen={removeModalOpen}
        setModalOpen={setRemoveModalOpen}
        groupId={group.id ?? ''}
        groupName={group?.name ?? ''}
      />
      <LeaveGroupModal
        modalOpen={leaveModalOpen}
        setModalOpen={setLeaveModalOpen}
        groupId={group.id ?? ''}
        groupName={group?.name ?? ''}
        currentUserId={currentUser.id}
        memberCount={group?.members.length ?? 0}
      />
      <CreateGroupModal
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
        currentUser={currentUser}
        initialData={group}
        isEditMode
      />
    </>
  );
};
