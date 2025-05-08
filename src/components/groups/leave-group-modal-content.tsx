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
import { useRemoveMemberFromGroupMutation } from '@/mutations/groups';

type LeaveGroupModalContentProps = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  groupId: string;
  groupName: string;
  currentUserId: string;
  memberCount: number;
  onSuccess?: () => void;
};

export const LeaveGroupModalContent = ({
  modalOpen,
  setModalOpen,
  groupId,
  groupName,
  currentUserId,
  onSuccess,
}: LeaveGroupModalContentProps) => {
  const { mutate: removeMember, isPending: isRemoving } =
    useRemoveMemberFromGroupMutation();

  const handleLeaveGroup = () => {
    removeMember(
      { groupId, memberId: currentUserId },
      {
        onSuccess: () => {
          onSuccess?.();
          setModalOpen(false); // Close the modal on success
        },
        onError: (error) => {
          console.error('Failed to leave group:', error);
        },
      }
    );
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave Group</DialogTitle>
          <DialogDescription>
            Are you sure you want to leave the group{' '}
            <strong>{groupName}</strong>? You will no longer be a member of this
            group.
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
            onClick={handleLeaveGroup}
          >
            {isRemoving ? <Spinner /> : 'Leave Group'}
          </Button>
        </DialogFooter>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};
