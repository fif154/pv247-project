import { ITransactionManagerService } from '@/server/application/services/transaction-manager.service.interface';
import { IUpdateMealUseCase } from '@/server/application/use-cases/meals/update-meal.use-case';
import {
  CreateMealAdditionalIngredient,
  Meal,
} from '@/server/entities/models/meal';

export const updateMealController =
  (
    updateMealUseCase: IUpdateMealUseCase,
    transactionManager: ITransactionManagerService
  ) =>
  async (
    id: string,
    input: Partial<Omit<Meal, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>>,
    additionalIngredients?: Omit<CreateMealAdditionalIngredient, 'mealId'>[],
    dnd = false
  ) => {
    return transactionManager.startTransaction(async (tx) => {
      try {
        return await updateMealUseCase(
          id,
          input,
          additionalIngredients,
          dnd,
          tx
        );
      } catch (error) {
        console.error('Error updating meal:', error);
        tx.rollback();
      }
    });
  };

export type IUpdateMealController = ReturnType<typeof updateMealController>;
