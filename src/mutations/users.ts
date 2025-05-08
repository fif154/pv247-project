import { searchUsersByEmailAction } from '@/app/(users)/actions';
import { showErrorToast } from '@/utils/toast';
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
