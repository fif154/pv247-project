import { IListMealsUseCase } from '@/server/application/use-cases/meals/list-meals.use-case';
import { DateRange } from 'react-day-picker';

export const listMealsController =
  (listMealsUseCase: IListMealsUseCase) =>
  async (mealPlanId?: string, dateRange?: DateRange) => {
    return listMealsUseCase(mealPlanId, dateRange);
  };

export type IListMealsController = ReturnType<typeof listMealsController>;
