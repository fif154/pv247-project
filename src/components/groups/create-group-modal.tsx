'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { GroupModalContent } from './group-modal-content';
import { Plus } from 'lucide-react';
import { UserInfo } from '@/server/entities/models/user';

type CreateGroupModalProps = {
  currentUser: UserInfo;
};

export const CreateGroupModal = ({ currentUser }: CreateGroupModalProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600"
      >
        <Plus />
        Create Group
      </Button>
      <GroupModalContent
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentUser={currentUser}
      />
    </>
  );
};
