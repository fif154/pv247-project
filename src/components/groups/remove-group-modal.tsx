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
import { useRouter } from 'next/navigation';

type RemoveGroupModalContent = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  groupId: string;
  groupName: string;
};

export const RemoveGroupModal = ({
  modalOpen,
  setModalOpen,
  groupId,
  groupName,
}: RemoveGroupModalContent) => {
  const { mutateAsync: removeGroup, isPending: isRemoving } =
    useRemoveGroupMutation();
  const router = useRouter();

  const handleRemove = async () => {
    await removeGroup(groupId, {
      onSuccess: () => {
        setModalOpen(false); // Close the modal on success
        setTimeout(() => {
          router.refresh();
        }, 100);
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
            variant="destructive"
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
