import { ISetCurrentGroupUseCase } from '@/server/application/use-cases/users/set-current-group.use-case';
import { z } from 'zod';

const setCurrentGroupSchema = z.object({
  groupId: z.string().uuid(),
});

export const setCurrentGroupController =
  (setCurrentGroupUseCase: ISetCurrentGroupUseCase) =>
  async (input: unknown) => {
    const { groupId } = setCurrentGroupSchema.parse(input);
    return setCurrentGroupUseCase(groupId);
  };

export type ISetCurrentGroupController = ReturnType<
  typeof setCurrentGroupController
>;
