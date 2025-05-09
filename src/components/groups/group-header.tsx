'use client';

import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { CreateGroupModal } from './create-group-modal/create-group-modal';
import { useState } from 'react';
import { UserInfo } from '@/server/entities/models/user';

type GroupHeaderProps = {
  currentUser: UserInfo;
};

export const GroupHeader = ({ currentUser }: GroupHeaderProps) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between gap-6">
        <h1 className="text-4xl font-bold">Groups</h1>
        <Button
          className="hidden md:flex "
          variant="coral"
          onClick={() => setCreateModalOpen(true)}
        >
          <Plus /> Create New Group
        </Button>
      </div>
      <CreateGroupModal
        modalOpen={createModalOpen}
        setModalOpen={setCreateModalOpen}
        currentUser={currentUser}
      />
    </>
  );
};
