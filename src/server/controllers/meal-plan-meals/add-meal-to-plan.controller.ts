import { ITransactionManagerService } from '@/server/application/services/transaction-manager.service.interface';
import { IAddMealToPlanUseCase } from '@/server/application/use-cases/meal-plan-meals/add-meal-to-plan.use-case';

export const addMealToPlanController =
  (
    addMealToPlanUseCase: IAddMealToPlanUseCase,
    transactionManagerService: ITransactionManagerService
  ) =>
  async (mealPlanId: string, mealId: string) => {
    return transactionManagerService.startTransaction(async (tx) => {
      try {
        return await addMealToPlanUseCase(mealPlanId, mealId);
      } catch (error) {
        tx.rollback();
        throw error;
      }
    });
  };

export type IAddMealToPlanController = ReturnType<
  typeof addMealToPlanController
>;
