import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { EditProfileForm } from './edit-profile-form';
import { EditUser } from '@/server/entities/models/user';

type EditProfileModalModalProps = {
  userInfo: EditUser;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

export const EditProfileModal = ({
  userInfo,
  modalOpen,
  setModalOpen,
}: EditProfileModalModalProps) => {
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update the details of your profile below.
          </DialogDescription>
        </DialogHeader>
        <EditProfileForm setModalOpen={setModalOpen} userInfo={userInfo} />
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};
