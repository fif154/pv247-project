'use client';

import { useState } from 'react';
import { CreateGroupModal } from './create-group-modal';
import { UserInfo } from '@/server/entities/models/user';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type CreateGroupButtonProps = {
  currentUser: UserInfo;
};
export const CreateGroupButton = ({ currentUser }: CreateGroupButtonProps) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  return (
    <>
      <Button
        className="hidden md:flex "
        variant="coral"
        onClick={() => setCreateModalOpen(true)}
      >
        {' '}
        <Plus /> Create New Group
      </Button>
      <CreateGroupModal
        modalOpen={createModalOpen}
        setModalOpen={setCreateModalOpen}
        currentUser={currentUser}
      />
    </>
  );
};
