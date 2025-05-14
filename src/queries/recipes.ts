import { listRecipes } from '@/app/auth/recipes/actions';
import { useQuery } from '@tanstack/react-query';

export function useRecipes() {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: listRecipes,
  });
}
