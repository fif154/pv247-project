import { ITransactionManagerService } from '@/server/application/services/transaction-manager.service.interface';
import { IRemoveMealFromPlanUseCase } from '@/server/application/use-cases/meal-plan-meals/remove-meal-from-plan.use-case';

export const removeMealFromPlanController =
  (
    removeMealFromPlanUseCase: IRemoveMealFromPlanUseCase,
    transactionManagerService: ITransactionManagerService
  ) =>
  async (mealPlanId: string, mealId: string) => {
    return transactionManagerService.startTransaction(async (tx) => {
      try {
        await removeMealFromPlanUseCase(mealPlanId, mealId);
      } catch (error) {
        tx.rollback();
        throw error;
      }
    });
  };

export type IRemoveMealFromPlanController = ReturnType<
  typeof removeMealFromPlanController
>;
