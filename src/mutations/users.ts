import {
  editMacrosAction,
  editUserAction,
  searchUsersByEmailAction,
} from '@/app/(users)/actions';
import { showErrorToast, showSuccessToast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';

export const useSearchUsersByEmailMutation = () =>
  useMutation({
    mutationFn: async (email: string) => {
      return await searchUsersByEmailAction(email);
    },
    onError: () => {
      showErrorToast('Failed to search users. Please try again.');
    },
  });

export const useEditUserMutation = () =>
  useMutation({
    mutationFn: async (data: {
      userId: string;
      name: string;
      email: string;
      image?: string | null;
    }) => {
      return await editUserAction(data);
    },
    onError: () => {
      showErrorToast('Failed to edit user. Please try again.');
    },
    onSuccess: () => {
      showSuccessToast('User updated successfully.');
    },
  });

export const useEditMacrosMutation = () =>
  useMutation({
    mutationFn: async (data: {
      userId: string;
      fats: number;
      protein: number;
      carbs: number;
      calories: number;
    }) => {
      return await editMacrosAction(data);
    },
    onError: () => {
      showErrorToast('Failed to edit macros. Please try again.');
    },
    onSuccess: () => {
      showSuccessToast('Macros updated successfully.');
    },
  });
