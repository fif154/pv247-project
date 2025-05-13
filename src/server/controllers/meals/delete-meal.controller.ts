import { ITransactionManagerService } from '@/server/application/services/transaction-manager.service.interface';

export const deleteMealController =
  (
    deleteMealUseCase: (id: string, tx?: unknown) => Promise<void>,
    transactionManager: ITransactionManagerService
  ) =>
  async (id: string) => {
    return transactionManager.startTransaction(async (tx) => {
      try {
        await deleteMealUseCase(id, tx);
      } catch (error) {
        tx.rollback();
        throw error;
      }
    });
  };
