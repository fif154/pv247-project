'use client';

import { DoorOpen, Pencil, Trash2, User } from 'lucide-react';
import { Card } from '../ui/card';
import { useGetUserGroupsWithMembersQuery } from '@/mutations/groups';
import { RemoveGroupModalContent } from './remove-group-modal-content';
import { LeaveGroupModalContent } from './leave-group-modal-content';
import { useState } from 'react';

type GroupListProps = {
  userId: string;
};

export const GroupList = ({ userId }: GroupListProps) => {
  const { data, isLoading, error } = useGetUserGroupsWithMembersQuery(userId);
  const groups = data ?? [];

  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<{
    id: string;
    name: string;
    memberCount: number;
  } | null>(null);

  const handleOpenRemoveModal = (groupId: string, groupName: string) => {
    setSelectedGroup({ id: groupId, name: groupName, memberCount: 0 });
    setRemoveModalOpen(true);
  };

  const handleOpenLeaveModal = (
    groupId: string,
    groupName: string,
    memberCount: number
  ) => {
    if (memberCount > 1) {
      setSelectedGroup({ id: groupId, name: groupName, memberCount });
      setLeaveModalOpen(true);
    }
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
                  <Pencil />
                  <DoorOpen
                    className={
                      g.members.length <= 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : ' cursor-pointerhover:text-blue-500'
                    }
                    onClick={() =>
                      handleOpenLeaveModal(g.id, g.name, g.members.length)
                    }
                  />
                  <Trash2
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => handleOpenRemoveModal(g.id, g.name)}
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
            groupId={selectedGroup.id}
            groupName={selectedGroup.name}
          />
          <LeaveGroupModalContent
            modalOpen={leaveModalOpen}
            setModalOpen={setLeaveModalOpen}
            groupId={selectedGroup.id}
            groupName={selectedGroup.name}
            currentUserId={userId}
            memberCount={selectedGroup.memberCount}
          />
        </>
      )}
    </>
  );
};
