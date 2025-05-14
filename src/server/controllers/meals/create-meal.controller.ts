import { ITransactionManagerService } from '@/server/application/services/transaction-manager.service.interface';
import { ICreateMealUseCase } from '@/server/application/use-cases/meals/create-meal.use-case';
import {
  CreateMeal,
  CreateMealAdditionalIngredient,
} from '@/server/entities/models/meal';

export const createMealController =
  (
    createMealUseCase: ICreateMealUseCase,
    transactionManagerService: ITransactionManagerService
  ) =>
  async (
    input: Omit<CreateMeal, 'userId' | 'groupId'>,
    additionalIngredients?: Omit<CreateMealAdditionalIngredient, 'mealId'>[],
    mealPlanId?: string
  ) => {
    return transactionManagerService.startTransaction(async (tx) => {
      try {
        return await createMealUseCase(
          input,
          additionalIngredients,
          mealPlanId,
          tx
        );
      } catch (error) {
        console.error('Error creating meal:', error);
        tx.rollback();
      }
    });
  };

export type ICreateMealController = ReturnType<typeof createMealController>;
