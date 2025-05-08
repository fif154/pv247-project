import { z } from 'zod';
import { IEditGroupUseCase } from '@/server/application/use-cases/groups/edit-group.use-case';
import { ITransactionManagerService } from '@/server/application/services/transaction-manager.service.interface';

const editGroupInputSchema = z.object({
  groupId: z.string().min(1),
  name: z.string().min(3, 'Group name must be at least 3 characters long'),
  description: z.string().optional(),
  members: z.array(z.string()).nonempty('Members list cannot be empty'),
});

export const editGroupController =
  (
    editGroupUseCase: IEditGroupUseCase,
    transactionManagerService: ITransactionManagerService
  ) =>
  async (input: unknown) => {
    return transactionManagerService.startTransaction(async (tx) => {
      try {
        const data = editGroupInputSchema.parse(input);
        const updatedGroup = await editGroupUseCase(
          {
            groupId: data.groupId,
            name: data.name,
            description: data.description ?? null,
            members: data.members,
          },
          tx
        );

        return updatedGroup;
      } catch (error) {
        console.error('Error creating grocery list:', error);
        tx.rollback();
      }
    });
  };

export type IEditGroupController = ReturnType<typeof editGroupController>;
