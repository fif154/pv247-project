import { auth } from '@/auth';
import { IMealsRepository } from '@/server/application/repositories/meals.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { IGroupService } from '../../services/group.service.interface';

export const listMealsUseCase =
  (mealsRepository: IMealsRepository, groupService: IGroupService) =>
  async () => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    return mealsRepository.listMeals(user.groupId);
  };

export type IListMealsUseCase = ReturnType<typeof listMealsUseCase>;
