'use client';

import { cn } from '@/lib/utils';
import { useSelectCurrentGroupMutation } from '@/mutations/groups';
import { GroupWithMembers } from '@/server/entities/models/group';
import { CheckSquare2Icon, DoorOpen, Pencil, Trash2, User } from 'lucide-react';
import { Session } from 'next-auth';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { CreateGroupModal } from './create-group-modal/create-group-modal';
import { LeaveGroupModal } from './leave-group-modal';
import { RemoveGroupModal } from './remove-group-modal';

type GroupCardProps = {
  group: GroupWithMembers;
  currentUser: Session['user'];
};

export const GroupCard = ({ group, currentUser }: GroupCardProps) => {
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const isCurrentUserGroup = group.id === currentUser.groupId;

  const selectCurrentGroupMutation = useSelectCurrentGroupMutation();

  return (
    <>
      <Card
        key={group.id}
        className={cn(
          'flex flex-row w-full p-5',
          isCurrentUserGroup ? 'border-coral' : ''
        )}
      >
        <div className="flex flex-col w-full gap-3">
          {isCurrentUserGroup ? (
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <CheckSquare2Icon className="text-coral" /> Currently selected
              group
            </span>
          ) : null}
          <div className="flex justify-between w-full">
            <h2 className="text-xl font-bold">{group.name}</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEditModalOpen(true);
                }}
              >
                <Pencil onClick={() => setEditModalOpen(true)} />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setLeaveModalOpen(true);
                }}
                disabled={group.members.length <= 1 || isCurrentUserGroup}
              >
                <DoorOpen />
              </Button>
              <Button
                variant="outline"
                className="hover:text-destructive"
                onClick={() => setRemoveModalOpen(true)}
                disabled={isCurrentUserGroup}
              >
                <Trash2 onClick={() => setRemoveModalOpen(true)} />
              </Button>
            </div>
          </div>

          <span>{group.description}</span>
          <div className="flex gap-3 items-center">
            <User />
            {group.members.length} member{group.members.length > 1 && 's'}
          </div>
          <div className="flex justify-between items-end">
            <span className="text-xs text-gray-500">
              Created at {group.createdAt}
            </span>
            {!isCurrentUserGroup ? (
              <Button
                variant="coral"
                onClick={() => selectCurrentGroupMutation.mutateAsync(group.id)}
              >
                Select as current group
              </Button>
            ) : null}
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
        currentUserId={currentUser.id!}
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
