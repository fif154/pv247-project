import { listUnits } from '@/app/auth/units/actions';
import { useQuery } from '@tanstack/react-query';

export function useUnits() {
  return useQuery({
    queryKey: ['units'],
    queryFn: listUnits,
  });
}
