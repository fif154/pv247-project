import { ITransactionManagerService } from '@/server/application/services/transaction-manager.service.interface';
import {
  CreateMealAdditionalIngredient,
  Meal,
} from '@/server/entities/models/meal';

export const updateMealController =
  (
    updateMealUseCase: (
      id: string,
      input: Partial<
        Omit<Meal, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>
      >,
      additionalIngredients?: Omit<CreateMealAdditionalIngredient, 'mealId'>[],
      tx?: unknown
    ) => Promise<
      Meal & { additionalIngredients?: CreateMealAdditionalIngredient[] }
    >,
    transactionManager: ITransactionManagerService
  ) =>
  async (
    id: string,
    input: Partial<Omit<Meal, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>>,
    additionalIngredients?: Omit<CreateMealAdditionalIngredient, 'mealId'>[]
  ) => {
    return transactionManager.startTransaction(async (tx) => {
      try {
        return await updateMealUseCase(id, input, additionalIngredients, tx);
      } catch (error) {
        console.error('Error updating meal:', error);
        tx.rollback();
      }
    });
  };

export type IUpdateMealController = ReturnType<typeof updateMealController>;
