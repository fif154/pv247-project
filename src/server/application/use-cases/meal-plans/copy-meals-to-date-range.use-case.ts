import { auth } from '@/auth';
import { IMealPlansRepository } from '@/server/application/repositories/meal-plans.repository.interface';
import { IMealsRepository } from '@/server/application/repositories/meals.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { Meal } from '@/server/entities/models/meal';
import { addDays, differenceInDays, isSameDay } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { IMealAdditionalIngredientsRepository } from '../../repositories/meal-additional-ingredients.repository.interface';
import { IMealPlanMealsRepository } from '../../repositories/meal-plan-meals.repository.interface';
import { IGroupService } from '../../services/group.service.interface';

const shuffle = <T>(arr: T[]) =>
  arr
    .map((v) => [Math.random(), v] as const)
    .sort(([a], [b]) => a - b)
    .map(([, v]) => v);

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
    randomize: boolean = false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tx?: any
  ) => {
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

    const srcOffsetDays = differenceInDays(
      sourceRange.to ?? sourceRange.from!,
      sourceRange.from!
    );
    const tgtOffsetDays = differenceInDays(
      targetRange.to ?? targetRange.from!,
      targetRange.from!
    );
    const daysToCopy = Math.min(srcOffsetDays, tgtOffsetDays);

    const tgtMeals =
      mealPlan.meals
        ?.map((mpm) => mpm.meal!)
        .filter((m) => {
          const d = m.plannedDate && new Date(m.plannedDate);
          return (
            d &&
            d >= targetRange.from! &&
            d <= (targetRange.to ?? targetRange.from!)
          );
        }) ?? [];

    const occupancy: Record<string, Record<string, number>> = {};
    const inc = (d: Date, t: string) => {
      const k = key(d);
      occupancy[k] ??= {};
      occupancy[k][t] = (occupancy[k][t] ?? 0) + 1;
    };
    tgtMeals.forEach((m) => inc(new Date(m.plannedDate!), m.mealTypeId));

    const tgtDates: Date[] = [];
    for (let i = 0; i <= daysToCopy; i++) {
      tgtDates.push(addDays(targetRange.from!, i));
    }

    const mealsByType = new Map<string, Meal[]>();
    srcMeals.forEach((m) => {
      mealsByType.set(m.mealTypeId, [
        ...(mealsByType.get(m.mealTypeId) ?? []),
        m,
      ]);
    });

    const mealTypeEntries = [...mealsByType.entries()].map(
      ([typeId, meals]) => [typeId, randomize ? shuffle(meals) : meals] as const
    );
    if (randomize) mealTypeEntries.sort(() => Math.random() - 0.5);

    const placedMeals: Meal[] = [];

    for (const [typeId, meals] of mealTypeEntries) {
      const candidateDates = randomize ? shuffle([...tgtDates]) : tgtDates;
      const byEmptiness = [...candidateDates].sort(
        (a, b) =>
          (occupancy[key(a)]?.[typeId] ?? 0) -
          (occupancy[key(b)]?.[typeId] ?? 0)
      );

      for (const srcMeal of meals) {
        const targetDate = byEmptiness.shift();
        if (!targetDate) break;

        const newMeal = await mealsRepository.createMeal(
          {
            name: srcMeal.name,
            userId: user.id,
            groupId: user.groupId,
            recipeId: srcMeal.recipeId,
            mealTypeId: srcMeal.mealTypeId,
            plannedDate: targetDate,
            notes: srcMeal.notes,
            image: srcMeal.image,
          },
          tx
        );

        await mealPlanMealsRepository.addMealToPlan(mealPlanId, newMeal.id, tx);

        if (srcMeal.additionalIngredients?.length) {
          await additionalIngredientsRepository.addIngredientsToMeal(
            srcMeal.additionalIngredients.map((ai) => ({
              ...ai,
              mealId: newMeal.id,
            })),
            tx
          );
        }
        inc(targetDate, typeId);
        placedMeals.push(newMeal);

        const nextPos = byEmptiness.findIndex(
          (d) =>
            (occupancy[key(d)]?.[typeId] ?? 0) >
            (occupancy[key(targetDate)]?.[typeId] ?? 0)
        );
        byEmptiness.splice(
          nextPos === -1 ? byEmptiness.length : nextPos,
          0,
          targetDate
        );
      }
    }

    if (!randomize) {
      for (let i = 0; i <= daysToCopy; i++) {
        const srcDate = addDays(sourceRange.from!, i);
        const tgtDate = addDays(targetRange.from!, i);

        const todaysMeals = srcMeals.filter((m) =>
          isSameDay(new Date(m.plannedDate!), srcDate)
        );

        for (const srcMeal of todaysMeals) {
          const newMeal = await mealsRepository.createMeal(
            {
              name: srcMeal.name,
              userId: user.id,
              groupId: user.groupId,
              recipeId: srcMeal.recipeId,
              mealTypeId: srcMeal.mealTypeId,
              plannedDate: tgtDate,
              notes: srcMeal.notes,
              image: srcMeal.image,
            },
            tx
          );

          if (srcMeal.additionalIngredients?.length) {
            await additionalIngredientsRepository.addIngredientsToMeal(
              srcMeal.additionalIngredients.map((ai) => ({
                ...ai,
                mealId: newMeal.id,
              })),
              tx
            );
          }

          await mealPlanMealsRepository.addMealToPlan(
            mealPlanId,
            newMeal.id,
            tx
          );

          inc(tgtDate, srcMeal.mealTypeId);
          placedMeals.push(newMeal);
        }
      }
    }

    return placedMeals;
  };

export type ICopyMealsToDateRangeUseCase = ReturnType<
  typeof copyMealsToDateRangeUseCase
>;
