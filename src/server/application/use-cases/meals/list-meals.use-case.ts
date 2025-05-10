import { auth } from '@/auth';
import { IMealsRepository } from '@/server/application/repositories/meals.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';

export const listMealsUseCase =
  (mealsRepository: IMealsRepository) => async () => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return mealsRepository.listMeals(user.groupId!);
  };

export type IListMealsUseCase = ReturnType<typeof listMealsUseCase>;
