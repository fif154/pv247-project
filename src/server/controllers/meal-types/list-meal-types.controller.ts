import { IListMealTypesUseCase } from '@/server/application/use-cases/meal-types/list-meal-types.use-case';

export const listMealTypesController =
  (listMealTypesUseCase: IListMealTypesUseCase) => async () => {
    return listMealTypesUseCase();
  };

export type IListMealsTypesController = ReturnType<
  typeof listMealTypesController
>;
