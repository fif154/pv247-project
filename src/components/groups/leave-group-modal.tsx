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
import { useRouter } from 'next/navigation';

type LeaveGroupModalProps = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  groupId: string;
  groupName: string;
  currentUserId: string;
  memberCount: number;
};

export const LeaveGroupModal = ({
  modalOpen,
  setModalOpen,
  groupId,
  groupName,
  currentUserId,
}: LeaveGroupModalProps) => {
  const { mutate: removeMember, isPending: isRemoving } =
    useRemoveMemberFromGroupMutation();
  const router = useRouter();

  const handleLeaveGroup = () => {
    removeMember(
      { groupId, memberId: currentUserId },
      {
        onSuccess: () => {
          router.refresh();
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
            variant="destructive"
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
