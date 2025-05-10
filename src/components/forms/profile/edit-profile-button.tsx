'use client';
import { Button } from '@/components/ui/button';
import { EditUser } from '@/server/entities/models/user';
import { useState } from 'react';
import { EditProfileModal } from './edit-profile-modal';

type EditProfileButtonProps = {
  userInfo: EditUser;
};

export const EditProfileButton = ({ userInfo }: EditProfileButtonProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setModalOpen(true)}>
        Edit Profile
      </Button>
      <EditProfileModal
        userInfo={userInfo}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  );
};
