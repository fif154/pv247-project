import { listMealsAction } from '@/app/meals/actions';
import { useQuery } from '@tanstack/react-query';
import { DateRange } from 'react-day-picker';

export const useMeals = (mealPlanId?: string, dateRange?: DateRange) =>
  useQuery({
    queryKey: ['meals', mealPlanId],
    queryFn: () => listMealsAction(mealPlanId, dateRange),
  });
