'use client';

import { DoorOpen, Pencil, Trash2, User } from 'lucide-react';
import { Card } from '../ui/card';
import { useGetUserGroupsWithMembersQuery } from '@/mutations/groups';
import { RemoveGroupModalContent } from './remove-group-modal-content';
import { LeaveGroupModalContent } from './leave-group-modal-content';
import { useState } from 'react';
import { GroupModalContent } from './group-modal-content';
import { UserInfo } from '@/server/entities/models/user';

type GroupListProps = {
  currentUser: UserInfo;
};

export const GroupList = ({ currentUser }: GroupListProps) => {
  const { data, isLoading, error } = useGetUserGroupsWithMembersQuery(
    currentUser.id
  );
  const groups = data ?? [];

  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const handleOpenRemoveModal = (groupId: string) => {
    setSelectedGroup(groupId);
    setRemoveModalOpen(true);
  };

  const handleOpenLeaveModal = (groupId: string, memberCount: number) => {
    if (memberCount > 1) {
      setSelectedGroup(groupId);
      setLeaveModalOpen(true);
    }
  };

  const handleOpenEditModal = (groupId: string) => {
    setSelectedGroup(groupId);
    setEditModalOpen(true);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading groups</p>;

  return (
    <>
      <div className="flex flex-col items-center">
        {groups.map((g) => (
          <Card key={g.id} className="flex flex-row w-full p-5">
            <div className="flex flex-col w-full gap-3">
              <div className="flex justify-between w-full">
                <h2 className="text-xl font-bold">{g.name}</h2>
                <div className="flex gap-5">
                  <Pencil
                    className="cursor-pointer hover:text-gray-500"
                    onClick={() => handleOpenEditModal(g.id)}
                  />
                  <DoorOpen
                    className={
                      g.members.length <= 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : ' cursor-pointerhover:text-blue-500'
                    }
                    onClick={() => handleOpenLeaveModal(g.id, g.members.length)}
                  />
                  <Trash2
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => handleOpenRemoveModal(g.id)}
                  />
                </div>
              </div>

              <span>{g.description}</span>
              <div className="flex gap-3 items-center">
                <User />
                {g.members.length} member{g.members.length > 1 && 's'}
              </div>
              <div className="">
                <span className="text-xs text-gray-500">
                  Created at {g.createdAt}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedGroup && (
        <>
          <RemoveGroupModalContent
            modalOpen={removeModalOpen}
            setModalOpen={setRemoveModalOpen}
            groupId={selectedGroup}
            groupName={groups.find((g) => g.id === selectedGroup)?.name ?? ''}
          />
          <LeaveGroupModalContent
            modalOpen={leaveModalOpen}
            setModalOpen={setLeaveModalOpen}
            groupId={selectedGroup}
            groupName={groups.find((g) => g.id === selectedGroup)?.name ?? ''}
            currentUserId={currentUser.id}
            memberCount={
              groups.find((g) => g.id === selectedGroup)?.members.length ?? 0
            }
          />
          <GroupModalContent
            modalOpen={editModalOpen}
            setModalOpen={setEditModalOpen}
            currentUser={currentUser}
            initialData={groups.findLast((g) => g.id === selectedGroup)}
            isEditMode
          />
        </>
      )}
    </>
  );
};
