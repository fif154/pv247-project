import { auth } from '@/auth';
import { IMealPlansRepository } from '@/server/application/repositories/meal-plans.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { CreateMealPlan } from '@/server/entities/models/meal-plan';

export const createMealPlanUseCase =
  (mealPlansRepository: IMealPlansRepository) =>
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

    return mealPlansRepository.createMealPlan(
      {
        ...input,
        createdBy: user.id,
      },
      mealIds,
      tx
    );
  };

export type ICreateMealPlanUseCase = ReturnType<typeof createMealPlanUseCase>;
