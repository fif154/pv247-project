import { auth } from '@/auth';
import { IMealsRepository } from '@/server/application/repositories/meals.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { IGroupService } from '../../services/group.service.interface';

export const listMealsForDayUseCase =
  (mealsRepository: IMealsRepository, groupService: IGroupService) =>
  async (data: { date: Date }) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    return mealsRepository.listMealsForDay(user.groupId, data.date);
  };

export type IListMealsForDayUseCase = ReturnType<typeof listMealsForDayUseCase>;
