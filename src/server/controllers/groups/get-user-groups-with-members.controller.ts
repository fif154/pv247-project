import { z } from 'zod';
import { IGetUserGroupsWithMembersUseCase } from '@/server/application/use-cases/groups/get-user-groups-with-members.use-case';
import { InputParseError } from '@/server/entities/errors/common';

const getUserGroupsInputSchema = z.object({
  userId: z.string().min(1),
});

export const getUserGroupsWithMembersController =
  (getUserGroupsWithMembersUseCase: IGetUserGroupsWithMembersUseCase) =>
  async (input: unknown) => {
    const { data, error } = getUserGroupsInputSchema.safeParse(input);

    if (error) {
      throw new InputParseError('Invalid data', { cause: error });
    }

    const groupsWithMembers = await getUserGroupsWithMembersUseCase(
      data.userId
    );

    return groupsWithMembers;
  };

export type IGetUserGroupsWithMembersController = ReturnType<
  typeof getUserGroupsWithMembersController
>;
