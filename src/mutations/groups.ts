import {
  createGroupWithMembersAction,
  editGroupAction,
  getGroupWithMembersAction,
  getUserGroupsWithMembersAction,
  removeGroupAction,
  removeMemberFromGroupAction,
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

export const useEditGroupMutation = () =>
  useMutation({
    mutationFn: async (data: {
      groupId: string;
      name: string;
      description?: string;
      members: string[];
    }) => {
      return await editGroupAction(data);
    },
    onError: () => {
      showErrorToast('Failed to edit group. Please try again.');
    },
    onSuccess: () => {
      showSuccessToast('Group updated successfully.');
    },
  });

export const useRemoveGroupMutation = () =>
  useMutation({
    mutationFn: async (groupId: string) => {
      return await removeGroupAction(groupId);
    },
    onError: () => {
      showErrorToast('Failed to remove group. Please try again.');
    },
    onSuccess: () => {
      showSuccessToast('Group removed successfully.');
    },
  });

export const useRemoveMemberFromGroupMutation = () =>
  useMutation({
    mutationFn: async (data: { groupId: string; memberId: string }) => {
      return await removeMemberFromGroupAction(data);
    },
    onError: () => {
      showErrorToast('Failed to remove member from group. Please try again.');
    },
    onSuccess: () => {
      showSuccessToast('Member removed from group successfully.');
    },
  });
