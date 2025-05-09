import { listIngredientsAction } from '@/app/ingredients/actions';
import { Ingredient } from '@/server/entities/models/ingredient';
import { useQuery } from '@tanstack/react-query';

export const useIngredients = () =>
  useQuery({
    queryKey: ['ingredients'],
    queryFn: async () => {
      const ingredients = await listIngredientsAction(true);
      return ingredients as Ingredient[];
    },
  });
