import { z } from 'zod';
import { IRemoveGroupUseCase } from '@/server/application/use-cases/groups/remove-group.use-case';
import { InputParseError } from '@/server/entities/errors/common';

const removeGroupInputSchema = z.object({
  groupId: z.string().min(1),
});

export const removeGroupController =
  (removeGroupUseCase: IRemoveGroupUseCase) => async (input: unknown) => {
    const { data, error } = removeGroupInputSchema.safeParse(input);

    if (error) {
      throw new InputParseError('Invalid data', { cause: error });
    }

    const result = await removeGroupUseCase(data.groupId);

    return result;
  };

export type IRemoveGroupController = ReturnType<typeof removeGroupController>;
