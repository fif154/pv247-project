import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { GroupFormFields } from './group-form-fields';
import { User, UserInfo } from '@/server/entities/models/user';
import { GroupWithMembers } from '@/server/entities/models/group';
import { UserSearch } from './user-search';
import { SelectedUsers } from './selected-users';
import {
  useCreateGroupWithMembersMutation,
  useEditGroupMutation,
} from '@/mutations/groups';
import { useRouter } from 'next/navigation';
import { Button } from '../../ui/button';
import { Spinner } from '../../ui/spinner';
import { useSearchUsersByEmailMutation } from '@/mutations/users';

const groupFormSchema = z.object({
  groupName: z
    .string()
    .min(3, 'Group Name is required and must be at least 3 characters long'),
  groupDescription: z.string(),
  members: z.array(z.string()).nonempty('At least one member is required'),
});
export type GroupFormSchema = z.infer<typeof groupFormSchema>;

type GroupFormProps = {
  initialData?: GroupWithMembers;
  currentUser: UserInfo;
  setModalOpen: (open: boolean) => void;
  isEditMode?: boolean;
};

export const GroupForm = ({
  initialData,
  currentUser,
  setModalOpen,
  isEditMode = false,
}: GroupFormProps) => {
  const [emailQuery, setEmailQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserInfo[]>(
    initialData?.members.map((u) => ({
      id: u.id ?? '',
      email: u.email ?? '',
    })) ?? [currentUser]
  );
  const { mutateAsync: searchUsersByEmail, isPending: isSearchPending } =
    useSearchUsersByEmailMutation();
  const { mutateAsync: createGroup, isPending: isCreatePending } =
    useCreateGroupWithMembersMutation();
  const { mutateAsync: editGroup, isPending: isEditPending } =
    useEditGroupMutation();

  const router = useRouter();
  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmailQuery(email);

    if (email.trim().length > 2) {
      await searchUsersByEmail(email, {
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

  const onSubmit = async (data: GroupFormSchema) => {
    if (isEditMode) {
      await editGroup(
        {
          groupId: initialData?.id ?? '',
          name: data.groupName,
          description: data.groupDescription,
          members: selectedUsers.map((user) => user.id),
        },
        {
          onSuccess: () => {
            setModalOpen(false);
            setTimeout(() => {
              router.refresh();
            }, 100);
          },
        }
      );
    } else {
      await createGroup(
        {
          name: data.groupName,
          description: data.groupDescription,
          members: selectedUsers.map((user) => user.id),
        },
        {
          onSuccess: () => {
            setModalOpen(false);
            setTimeout(() => {
              router.refresh();
            }, 100);
          },
        }
      );
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupFormSchema>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: {
      groupName: initialData?.name ?? '',
      groupDescription: initialData?.description ?? '',
      members: selectedUsers.map((u) => u.id),
    },
  });

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <GroupFormFields register={register} errors={errors} />
      <UserSearch
        emailQuery={emailQuery}
        handleEmailChange={handleEmailChange}
        users={users}
        isPending={isSearchPending}
        onUserSelect={handleUserSelect}
      />
      {selectedUsers.length > 0 && (
        <SelectedUsers
          selectedUsers={selectedUsers}
          currentUserId={currentUser.id}
          onRemoveUser={handleRemoveSelectedUser}
        />
      )}
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setEmailQuery('')}
        >
          Cancel
        </Button>
        <Button type="submit" variant="coral">
          {isCreatePending || isEditPending ? (
            <Spinner />
          ) : isEditMode ? (
            'Save Changes'
          ) : (
            'Create'
          )}
        </Button>
      </div>
    </form>
  );
};
