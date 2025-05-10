import { auth } from '@/auth';
import { IMealPlansRepository } from '@/server/application/repositories/meal-plans.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { IGroupService } from '../../services/group.service.interface';

export const listMealPlansUseCase =
  (mealPlansRepository: IMealPlansRepository, groupService: IGroupService) =>
  async () => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User is not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    return mealPlansRepository.listMealPlans(user.id, user.groupId);
  };

export type IListMealPlansUseCase = ReturnType<typeof listMealPlansUseCase>;
