'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { User } from 'next-auth';
import { useState } from 'react';
import { CreateGroupModal } from './create-group-modal';

type CreateGroupButtonProps = {
  currentUser: User;
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
