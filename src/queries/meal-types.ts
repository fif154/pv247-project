import { listMealTypes } from '@/app/auth/meal-types/actions';
import { MealType } from '@/server/entities/models/meal-type';
import { useQuery } from '@tanstack/react-query';

export const useMealTypes = () => {
  return useQuery<MealType[]>({
    queryKey: ['mealTypes'],
    queryFn: listMealTypes,
  });
};
