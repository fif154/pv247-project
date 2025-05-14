import { auth } from '@/auth';
import { IMealPlansRepository } from '@/server/application/repositories/meal-plans.repository.interface';
import { IMealsRepository } from '@/server/application/repositories/meals.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { Meal } from '@/server/entities/models/meal';
import { addDays, differenceInDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { IMealAdditionalIngredientsRepository } from '../../repositories/meal-additional-ingredients.repository.interface';
import { IMealPlanMealsRepository } from '../../repositories/meal-plan-meals.repository.interface';
import { IGroupService } from '../../services/group.service.interface';

const shuffle = <T>(arr: readonly T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const key = (d: Date) => d.toISOString().slice(0, 10);

export const copyMealsToDateRangeUseCase =
  (
    mealPlansRepository: IMealPlansRepository,
    mealsRepository: IMealsRepository,
    mealPlanMealsRepository: IMealPlanMealsRepository,
    additionalIngredientsRepository: IMealAdditionalIngredientsRepository,
    groupService: IGroupService
  ) =>
  async (
    mealPlanId: string,
    sourceRange: DateRange,
    targetRange: DateRange,
    randomize = false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tx?: any
  ): Promise<Meal[]> => {
    const user = (await auth())?.user;
    if (!user) throw new NotFoundError('User not found');
    if (!user.groupId) throw new NotFoundError('User not in a group');

    await groupService.verifyUserInGroup(user.id, user.groupId);

    const mealPlan = await mealPlansRepository.getMealPlanById(mealPlanId, tx);
    if (!mealPlan) throw new NotFoundError('Meal plan not found');
    if (mealPlan.groupId !== user.groupId) {
      throw new NotFoundError('Meal plan not in your group');
    }

    const srcMeals =
      mealPlan.meals
        ?.map((mpm) => mpm.meal!)
        .filter((m) => {
          const d = m.plannedDate && new Date(m.plannedDate);
          return (
            d &&
            d >= sourceRange.from! &&
            d <= (sourceRange.to ?? sourceRange.from!)
          );
        }) ?? [];

    if (!srcMeals.length) return [];

    const srcDays =
      differenceInDays(sourceRange.to ?? sourceRange.from!, sourceRange.from!) +
      1;
    const tgtDays =
      differenceInDays(targetRange.to ?? targetRange.from!, targetRange.from!) +
      1;
    const daysToCopy = Math.min(srcDays, tgtDays);

    const tgtDates: Date[] = Array.from({ length: tgtDays }, (_, i) =>
      addDays(targetRange.from!, i)
    );

    const occupancy: Record<string, Record<string, number>> = {};
    const incOccupancy = (d: Date, typeId: string) => {
      const k = key(d);
      occupancy[k] ??= {};
      occupancy[k][typeId] = (occupancy[k][typeId] ?? 0) + 1;
    };

    mealPlan.meals
      ?.map((mpm) => mpm.meal!)
      .forEach((m) => {
        const d = m.plannedDate && new Date(m.plannedDate);
        if (d) incOccupancy(d, m.mealTypeId);
      });

    const cloneMeal = async (src: Meal, plannedDate: Date) => {
      const newMeal = await mealsRepository.createMeal(
        {
          name: src.name,
          userId: user.id,
          groupId: user.groupId,
          recipeId: src.recipeId,
          mealTypeId: src.mealTypeId,
          plannedDate,
          notes: src.notes,
          image: src.image,
        },
        tx
      );

      await mealPlanMealsRepository.addMealToPlan(mealPlanId, newMeal.id, tx);

      if (src.additionalIngredients?.length) {
        await additionalIngredientsRepository.addIngredientsToMeal(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          src.additionalIngredients.map(({ id, ...ai }) => ({
            ...ai,
            mealId: newMeal.id,
          })),
          tx
        );
      }

      incOccupancy(plannedDate, src.mealTypeId);
      return newMeal;
    };

    if (!randomize) {
      const srcFrom = sourceRange.from!;

      const placed: Meal[] = [];
      for (const srcMeal of srcMeals) {
        const srcDate = new Date(srcMeal.plannedDate!);
        const offset = differenceInDays(srcDate, srcFrom);
        if (offset < 0 || offset >= daysToCopy) continue;

        const targetDate = addDays(targetRange.from!, offset);
        placed.push(await cloneMeal(srcMeal, targetDate));
      }

      return placed;
    }

    const shuffledSrc = shuffle(srcMeals);
    const placed: Meal[] = [];

    for (const srcMeal of shuffledSrc) {
      const typeId = srcMeal.mealTypeId;

      let minOcc = Infinity;
      tgtDates.forEach((d) => {
        const occ = occupancy[key(d)]?.[typeId] ?? 0;
        minOcc = Math.min(minOcc, occ);
      });

      const candidateDates = tgtDates.filter(
        (d) => (occupancy[key(d)]?.[typeId] ?? 0) === minOcc
      );

      const chosenDate =
        candidateDates[Math.floor(Math.random() * candidateDates.length)];

      placed.push(await cloneMeal(srcMeal, chosenDate));
    }

    return placed;
  };

export type ICopyMealsToDateRangeUseCase = ReturnType<
  typeof copyMealsToDateRangeUseCase
>;
