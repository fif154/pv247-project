import { z } from 'zod';
import { IGetGroupWithMembersUseCase } from '@/server/application/use-cases/groups/get-group-with-members.use-case';
import { InputParseError } from '@/server/entities/errors/common';

const getGroupInputSchema = z.object({
  groupId: z.string().min(1),
});

export const getGroupWithMembersController =
  (getGroupWithMembersUseCase: IGetGroupWithMembersUseCase) =>
  async (input: unknown) => {
    const { data, error } = getGroupInputSchema.safeParse(input);

    if (error) {
      throw new InputParseError('Invalid data', { cause: error });
    }

    const groupWithMembers = await getGroupWithMembersUseCase(data.groupId);

    if (!groupWithMembers) {
      throw new Error('Group not found');
    }

    return groupWithMembers;
  };

export type IGetGroupWithMembersController = ReturnType<
  typeof getGroupWithMembersController
>;
