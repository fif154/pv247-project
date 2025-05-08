import { z } from 'zod';
import { IRemoveMemberFromGroupUseCase } from '@/server/application/use-cases/groups/remove-member-from-group.use-case';
import { InputParseError } from '@/server/entities/errors/common';

const removeMemberFromGroupInputSchema = z.object({
  groupId: z.string().min(1),
  memberId: z.string().min(1),
});

export const removeMemberFromGroupController =
  (removeMemberFromGroupUseCase: IRemoveMemberFromGroupUseCase) =>
  async (input: unknown) => {
    const { data, error } = removeMemberFromGroupInputSchema.safeParse(input);

    if (error) {
      throw new InputParseError('Invalid data', { cause: error });
    }

    const result = await removeMemberFromGroupUseCase(data);

    return result;
  };

export type IRemoveMemberFromGroupController = ReturnType<
  typeof removeMemberFromGroupController
>;
