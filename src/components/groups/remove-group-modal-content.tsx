import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { useRemoveGroupMutation } from '@/mutations/groups';

type RemoveGroupModalContentProps = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  groupId: string;
  groupName: string;
  onSuccess?: () => void;
};

export const RemoveGroupModalContent = ({
  modalOpen,
  setModalOpen,
  groupId,
  groupName,
  onSuccess,
}: RemoveGroupModalContentProps) => {
  const { mutate: removeGroup, isPending: isRemoving } =
    useRemoveGroupMutation();

  const handleRemove = () => {
    removeGroup(groupId, {
      onSuccess: () => {
        onSuccess?.();
        setModalOpen(false); // Close the modal on success
      },
      onError: (error) => {
        console.error('Failed to remove group:', error);
      },
    });
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Group</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the group{' '}
            <strong>{groupName}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleRemove}
            disabled={isRemoving}
          >
            {isRemoving ? <Spinner /> : 'Delete'}
          </Button>
        </DialogFooter>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};
