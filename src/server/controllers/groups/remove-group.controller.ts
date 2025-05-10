import { z } from 'zod';
import { IRemoveGroupUseCase } from '@/server/application/use-cases/groups/remove-group.use-case';
import { ITransactionManagerService } from '@/server/application/services/transaction-manager.service.interface';

const removeGroupInputSchema = z.object({
  groupId: z.string().min(1),
});

export const removeGroupController =
  (
    removeGroupUseCase: IRemoveGroupUseCase,
    transactionManagerService: ITransactionManagerService
  ) =>
  async (input: unknown) => {
    return transactionManagerService.startTransaction(async (tx) => {
      try {
        const data = removeGroupInputSchema.parse(input);

        const result = await removeGroupUseCase(data.groupId);

        return result;
      } catch (error) {
        console.error('Error removing group:', error);
        tx.rollback();
      }
    });
  };

export type IRemoveGroupController = ReturnType<typeof removeGroupController>;
