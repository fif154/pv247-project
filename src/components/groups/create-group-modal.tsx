'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { CreateGroupModalContent } from './create-group-modal-content';
import { Plus } from 'lucide-react';

type CreateGroupModalProps = {
  userId: string;
  email: string;
};

export const CreateGroupModal = ({ userId, email }: CreateGroupModalProps) => {
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
      <CreateGroupModalContent
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentUser={{ id: userId, email: email }}
      />
    </>
  );
};
