import { z } from 'zod';
import { ICreateGroupWithMembersUseCase } from '@/server/application/use-cases/groups/create-group-with-members.use-case';
import { ITransactionManagerService } from '@/server/application/services/transaction-manager.service.interface';

const createGroupInputSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  members: z.array(z.string().min(1)),
});

export const createGroupWithMembersController =
  (
    createGroupWithMembersUseCase: ICreateGroupWithMembersUseCase,
    transactionManagerService: ITransactionManagerService
  ) =>
  async (input: unknown) => {
    return transactionManagerService.startTransaction(async (tx) => {
      try {
        const data = createGroupInputSchema.parse(input);

        const group = {
          name: data.name,
          description: data.description,
        };

        const createdGroup = await createGroupWithMembersUseCase(
          group,
          data.members
        );

        if (!createdGroup) {
          throw new Error('Failed to create group');
        }

        return createdGroup;
      } catch (error) {
        console.error('Error creating group:', error);
        tx.rollback();
      }
    });
  };

export type ICreateGroupWithMembersController = ReturnType<
  typeof createGroupWithMembersController
>;
