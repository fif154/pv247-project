import { z } from 'zod';
import { ICreateGroupWithMembersUseCase } from '@/server/application/use-cases/groups/create-group-with-members.use-case';
import { InputParseError } from '@/server/entities/errors/common';

const createGroupInputSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  members: z.array(z.string().min(1)),
});

export const createGroupWithMembersController =
  (createGroupWithMembersUseCase: ICreateGroupWithMembersUseCase) =>
  async (input: unknown) => {
    const { data, error } = createGroupInputSchema.safeParse(input);

    if (error) {
      throw new InputParseError('Invalid data', { cause: error });
    }

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
  };

export type ICreateGroupWithMembersController = ReturnType<
  typeof createGroupWithMembersController
>;
