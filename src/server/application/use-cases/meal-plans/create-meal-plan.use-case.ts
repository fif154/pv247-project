import { auth } from '@/auth';
import { IMealPlansRepository } from '@/server/application/repositories/meal-plans.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { CreateMealPlan } from '@/server/entities/models/meal-plan';
import { IGroupService } from '../../services/group.service.interface';

export const createMealPlanUseCase =
  (mealPlansRepository: IMealPlansRepository, groupService: IGroupService) =>
  async (
    input: CreateMealPlan,
    mealIds: string[],
    // TODO: remove any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tx?: any
  ) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User is not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    return mealPlansRepository.createMealPlan(
      {
        ...input,
        createdBy: user.id,
        groupId: user.groupId,
      },
      mealIds,
      tx
    );
  };

export type ICreateMealPlanUseCase = ReturnType<typeof createMealPlanUseCase>;
