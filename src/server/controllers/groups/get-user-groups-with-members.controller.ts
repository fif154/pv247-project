import { z } from 'zod';
import { IGetUserGroupsWithMembersUseCase } from '@/server/application/use-cases/groups/get-user-groups-with-members.use-case';

const getUserGroupsInputSchema = z.object({
  userId: z.string().min(1),
});

export const getUserGroupsWithMembersController =
  (getUserGroupsWithMembersUseCase: IGetUserGroupsWithMembersUseCase) =>
  async (input: unknown) => {
    const data = getUserGroupsInputSchema.parse(input);
    const groupsWithMembers = await getUserGroupsWithMembersUseCase(
      data.userId
    );

    return groupsWithMembers;
  };

export type IGetUserGroupsWithMembersController = ReturnType<
  typeof getUserGroupsWithMembersController
>;
