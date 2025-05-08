import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useSearchUsersByEmailMutation } from '@/mutations/users';
import { User, UserInfo } from '@/server/entities/models/user';
import { X } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '@radix-ui/react-label';
import { Spinner } from '../ui/spinner';
import { Textarea } from '../ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import {
  useCreateGroupWithMembersMutation,
  useEditGroupMutation,
} from '@/mutations/groups';
import { GroupWithMembers } from '@/server/entities/models/group';

type GroupModalContentProps = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  currentUser: UserInfo;
  initialData?: GroupWithMembers; // For editing, pre-fill the form
  isEditMode?: boolean; // Determines if it's edit mode
};

const groupFormSchema = z.object({
  groupName: z
    .string()
    .min(3, 'Group Name is required and must be at least 3 characters long'),
  groupDescription: z.string(),
  members: z.array(z.string()).nonempty('At least one member is required'),
});
type GroupFormSchema = z.infer<typeof groupFormSchema>;

export const GroupModalContent = ({
  modalOpen,
  setModalOpen,
  currentUser,
  initialData,
  isEditMode = false,
}: GroupModalContentProps) => {
  const [emailQuery, setEmailQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserInfo[]>(
    initialData?.members.map((u) => ({
      id: u.id ?? '',
      email: u.email ?? '',
    })) ?? [currentUser]
  );
  const { mutate: searchUsersByEmail, isPending: isSearchPending } =
    useSearchUsersByEmailMutation();
  const { mutate: createGroup, isPending: isCreatePending } =
    useCreateGroupWithMembersMutation();
  const { mutate: editGroup, isPending: isEditPending } =
    useEditGroupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupFormSchema>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: {
      groupName: initialData?.name ?? '',
      groupDescription: initialData?.description ?? '',
      members: [...(initialData?.members.map((u) => u.id) ?? currentUser.id)], // Pre-fill with current user or group owner
    },
  });

  const onSubmit = (data: GroupFormSchema) => {
    if (isEditMode) {
      editGroup(
        {
          groupId: initialData?.id ?? '',
          name: data.groupName,
          description: data.groupDescription,
          members: selectedUsers.map((user) => user.id),
        },
        {
          onSuccess: () => setModalOpen(false),
        }
      );
    } else {
      createGroup(
        {
          name: data.groupName,
          description: data.groupDescription,
          members: selectedUsers.map((user) => user.id),
        },
        {
          onSuccess: () => setModalOpen(false),
        }
      );
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmailQuery(email);

    if (email.trim().length > 2) {
      searchUsersByEmail(email, {
        onSuccess: (data) => {
          setUsers(
            data.filter((user) => !selectedUsers.some((u) => u.id === user.id))
          );
        },
        onError: () => {
          setUsers([]);
        },
      });
    } else {
      setUsers([]);
    }
  };

  const handleUserSelect = (user: User) => {
    if (!selectedUsers.some((selected) => selected.id === user.id)) {
      setSelectedUsers((prev) => [...prev, user]);
      setEmailQuery('');
      setUsers([]);
    }
  };

  const handleRemoveSelectedUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user.id !== userId));
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label htmlFor="groupName">Group Name</Label>
            <Input
              id="groupName"
              type="text"
              placeholder="Enter group name"
              {...register('groupName')}
            />
            {errors.groupName && (
              <p className="text-destructive text-sm">
                {errors.groupName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="groupDescription">Group Description</Label>
            <Textarea
              id="groupDescription"
              placeholder="Enter group description"
              {...register('groupDescription')}
            />
            {errors.groupDescription && (
              <p className="text-destructive text-sm">
                {errors.groupDescription.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="userSearch">Add Members by Email</Label>
            <div className="relative">
              <Input
                id="userSearch"
                type="text"
                value={emailQuery}
                onChange={handleEmailChange}
                placeholder="Search users by email"
                className="pr-10"
              />
              {isSearchPending && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Spinner />
                </div>
              )}
            </div>
            {!isSearchPending &&
            users.length === 0 &&
            emailQuery.trim().length > 2 ? (
              <span className="pt-5 p-2 text-gray-500">No users found</span>
            ) : (
              <ul className="mt-2 max-h-40 overflow-y-auto border rounded-md">
                {users.map((user) => (
                  <li
                    key={user.id}
                    className="p-2 hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleUserSelect(user)}
                  >
                    {user.email}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {selectedUsers.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Selected Members
              </label>
              <ul className="mt-2 border rounded-md">
                {selectedUsers.map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center justify-between p-2 border-b last:border-b-0"
                  >
                    <span>{user.email}</span>
                    {user.id !== currentUser.id && (
                      <button
                        type="button"
                        className="cursor-pointer text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveSelectedUser(user.id)}
                      >
                        <X />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {isCreatePending || isEditPending ? (
                <Spinner />
              ) : isEditMode ? (
                'Save Changes'
              ) : (
                'Create'
              )}
            </Button>
          </DialogFooter>
        </form>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};
