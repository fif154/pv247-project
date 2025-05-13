'use server';

import { mealPlansRepository } from '@/server/application/repositories/meal-plans.repository';
import { groupService } from '@/server/application/services/group.service';
import { transactionManager } from '@/server/application/services/transaction-manager.service';
import { updateMealPlanUseCase } from '@/server/application/use-cases/meal-plans/update-meal-plan.use-case';
import { updateMealPlanController } from '@/server/controllers/meal-plans/update-meal-plan.controller';
import { MealPlan } from '@/server/entities/models/meal-plan';

export const updateMealPlan = async (
  id: string,
  input: Partial<Omit<MealPlan, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>>
) => {
  const controller = updateMealPlanController(
    updateMealPlanUseCase(mealPlansRepository, groupService),
    transactionManager
  );

  return await controller(id, input);
};
