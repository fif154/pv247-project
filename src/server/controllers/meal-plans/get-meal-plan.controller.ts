import { IGetMealPlanUseCase } from '@/server/application/use-cases/meal-plans/get-meal-plan.use-case';

export const getMealPlanController =
  (getMealPlanUseCase: IGetMealPlanUseCase) => async (id: string) => {
    return getMealPlanUseCase(id);
  };

export type IGetMealPlanController = ReturnType<typeof getMealPlanController>;
