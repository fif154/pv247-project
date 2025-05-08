import { z } from 'zod';
import { IGetGroupWithMembersUseCase } from '@/server/application/use-cases/groups/get-group-with-members.use-case';

const getGroupInputSchema = z.object({
  groupId: z.string().min(1),
});

export const getGroupWithMembersController =
  (getGroupWithMembersUseCase: IGetGroupWithMembersUseCase) =>
  async (input: unknown) => {
    const data = getGroupInputSchema.parse(input);

    const groupWithMembers = await getGroupWithMembersUseCase(data.groupId);

    return groupWithMembers;
  };

export type IGetGroupWithMembersController = ReturnType<
  typeof getGroupWithMembersController
>;
