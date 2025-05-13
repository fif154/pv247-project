import { ITransactionManagerService } from '@/server/application/services/transaction-manager.service.interface';

export const deleteMealPlanController =
  (
    deleteMealPlanUseCase: (id: string) => Promise<void>,
    transactionManager: ITransactionManagerService
  ) =>
  async (id: string) => {
    return transactionManager.startTransaction(async (tx) => {
      try {
        await deleteMealPlanUseCase(id);
      } catch (error) {
        tx.rollback();
        throw error;
      }
    });
  };

export type IDeleteMealPlanController = ReturnType<
  typeof deleteMealPlanController
>;
