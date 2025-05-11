import {
  createGroupWithMembersAction,
  editGroupAction,
  removeGroupAction,
  removeMemberFromGroupAction,
  setCurrentGroupAction,
} from '@/app/(groups)/actions';
import { showErrorToast, showSuccessToast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';

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

export const useSelectCurrentGroupMutation = () =>
  useMutation({
    mutationFn: async (groupId: string) => {
      return await setCurrentGroupAction(groupId);
    },
    onError: () => {
      showErrorToast('Failed to select group. Please try again.');
    },
    onSuccess: () => {
      showSuccessToast('Group selected successfully.');
    },
  });
