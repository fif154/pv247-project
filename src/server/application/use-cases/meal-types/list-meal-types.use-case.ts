import { IMealTypesRepository } from '../../repositories/meal-types.repository.interface';

export const listMealTypesUseCase =
  (mealsRepository: IMealTypesRepository) => async () => {
    const mealTypes = await mealsRepository.listMealTypes();
    return mealTypes;
  };

export type IListMealTypesUseCase = ReturnType<typeof listMealTypesUseCase>;
