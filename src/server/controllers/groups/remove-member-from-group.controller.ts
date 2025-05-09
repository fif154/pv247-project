import { z } from 'zod';
import { IRemoveMemberFromGroupUseCase } from '@/server/application/use-cases/groups/remove-member-from-group.use-case';
import { ITransactionManagerService } from '@/server/application/services/transaction-manager.service.interface';

const removeMemberFromGroupInputSchema = z.object({
  groupId: z.string().min(1),
  memberId: z.string().min(1),
});

export const removeMemberFromGroupController =
  (
    removeMemberFromGroupUseCase: IRemoveMemberFromGroupUseCase,
    transactionManagerService: ITransactionManagerService
  ) =>
  async (input: unknown) => {
    return transactionManagerService.startTransaction(async (tx) => {
      try {
        const data = removeMemberFromGroupInputSchema.parse(input);

        const result = await removeMemberFromGroupUseCase(data);

        return result;
      } catch (error) {
        console.error('Error removing member from group:', error);
        tx.rollback();
      }
    });
  };

export type IRemoveMemberFromGroupController = ReturnType<
  typeof removeMemberFromGroupController
>;
