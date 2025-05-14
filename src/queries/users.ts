import { getUserAction } from '@/app/(users)/actions';
import { useQuery } from '@tanstack/react-query';

export const useUser = (userId: string) =>
  useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUserAction(userId),
  });
