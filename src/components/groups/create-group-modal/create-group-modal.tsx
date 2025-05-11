import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { GroupWithMembers } from '@/server/entities/models/group';
import { User } from 'next-auth';
import { GroupForm } from './group-form';

type CreateGroupModalProps = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  currentUser: User;
  initialData?: GroupWithMembers;
  isEditMode?: boolean;
  isPending?: boolean;
};

export const CreateGroupModal = ({
  modalOpen,
  setModalOpen,
  currentUser,
  initialData,
  isEditMode = false,
}: CreateGroupModalProps) => {
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Edit Group' : 'Create Group'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Update the details of your group below.'
              : 'Fill in the details below to create a new group.'}
          </DialogDescription>
        </DialogHeader>
        <GroupForm
          initialData={initialData}
          currentUser={currentUser}
          setModalOpen={setModalOpen}
          isEditMode={isEditMode}
        />
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};
