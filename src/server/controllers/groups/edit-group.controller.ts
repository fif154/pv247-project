import { z } from 'zod';
import { IEditGroupUseCase } from '@/server/application/use-cases/groups/edit-group.use-case';
import { InputParseError } from '@/server/entities/errors/common';

const editGroupInputSchema = z.object({
  groupId: z.string().min(1),
  name: z.string().min(3, 'Group name must be at least 3 characters long'),
  description: z.string().optional(),
  members: z.array(z.string()).nonempty('Members list cannot be empty'),
});

export const editGroupController =
  (editGroupUseCase: IEditGroupUseCase) => async (input: unknown) => {
    const { data, error } = editGroupInputSchema.safeParse(input);

    if (error) {
      throw new InputParseError('Invalid data', { cause: error });
    }

    const updatedGroup = await editGroupUseCase({
      groupId: data.groupId,
      name: data.name,
      description: data.description ?? null,
      members: data.members,
    });

    return updatedGroup;
  };

export type IEditGroupController = ReturnType<typeof editGroupController>;
