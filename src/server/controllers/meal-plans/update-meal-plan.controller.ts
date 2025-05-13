import { ITransactionManagerService } from '@/server/application/services/transaction-manager.service.interface';
import { MealPlan } from '@/server/entities/models/meal-plan';

export const updateMealPlanController =
  (
    updateMealPlanUseCase: (
      id: string,
      input: Partial<
        Omit<MealPlan, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>
      >
    ) => Promise<MealPlan>,
    transactionManager: ITransactionManagerService
  ) =>
  async (
    id: string,
    input: Partial<
      Omit<MealPlan, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>
    >
  ) => {
    return transactionManager.startTransaction(async (tx) => {
      try {
        return await updateMealPlanUseCase(id, input);
      } catch (error) {
        tx.rollback();
        throw error;
      }
    });
  };
