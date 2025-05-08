import {
  createGroupWithMembersAction,
  getGroupWithMembersAction,
  getUserGroupsWithMembersAction,
} from '@/app/(groups)/actions';
import { showErrorToast, showSuccessToast } from '@/utils/toast';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCreateGroupWithMembersMutation = () =>
  useMutation({
    mutationFn: async (data: {
      name: string;
      description?: string;
      members: string[];
    }) => {
      return await createGroupWithMembersAction(data);
    },
    onError: () => {
      showErrorToast('Failed to create group. Please try again.');
    },
    onSuccess: () => {
      showSuccessToast('Group created successfully.');
    },
  });

export const useGetGroupWithMembersQuery = (groupId: string) =>
  useQuery({
    queryKey: ['groupWithMembers', groupId],
    queryFn: async () => {
      return await getGroupWithMembersAction(groupId);
    },
  });

export const useGetUserGroupsWithMembersQuery = (userId: string) =>
  useQuery({
    queryKey: ['userGroupsWithMembers', userId],
    queryFn: async () => {
      return await getUserGroupsWithMembersAction(userId);
    },
  });
