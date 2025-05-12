'use client';

import { DayRow } from '@/components/meal-planning/day-row';
import { DraggedMealOverlay } from '@/components/meal-planning/dragged-meal-overlay';
import { useMealDragDrop } from '@/hooks/use-meal-drag-drop';
import { useUpdateMealMutation } from '@/mutations/meals';
import { useMealTypes } from '@/queries/meal-types';
import { useMeals } from '@/queries/meals';
import type { MealWithMacros } from '@/server/entities/models/meal';
import { MealPlan } from '@/server/entities/models/meal-plan';
import type { MealsByDayType } from '@/types/meal-planning';
import { DAYS } from '@/types/meal-planning';
import { isDateInRange } from '@/utils/date';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { addWeeks, getDay } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { MealPlanOverview } from './meal-planning/meal-plan-overview';
import { WeekNavigator } from './meal-planning/week-navigator';
import { Spinner } from './ui/spinner';

export const getDateFromDay = (dateRange: DateRange, day: string): Date => {
  const startDay = getDay(dateRange.from!);

  const dayIndex = DAYS.indexOf(DAYS.find((d) => d === day)!);

  const offset = (dayIndex - startDay + 7) % 7;

  const newDate = new Date(dateRange.from!);
  newDate.setDate(newDate.getDate() + offset);
  return newDate;
};

export const getDayFromDate = (date: Date) => {
  const dayIndex = getDay(date);

  return DAYS[dayIndex];
};

export function MealPlanning({ mealPlan }: { mealPlan: MealPlan }) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: mealPlan.startDate,
    to: addWeeks(mealPlan.startDate, 1),
  });

  const mealsQuery = useMeals(mealPlan.id);
  const mealTypesQuery = useMealTypes();

  const meals = useMemo(
    () =>
      (mealsQuery.data ?? []).filter((m) =>
        isDateInRange(m.plannedDate!, dateRange)
      ),
    [dateRange, mealsQuery.data]
  );
  const mealTypes = useMemo(
    () => mealTypesQuery.data ?? [],
    [mealTypesQuery.data]
  );

  const updateMealMutation = useUpdateMealMutation();

  const onMealUpdate = useCallback(
    (mealId: string, day: string, newType: string) => {
      updateMealMutation.mutate({
        mealId,
        data: {
          plannedDate: getDateFromDay(dateRange, DAYS.find((d) => d === day)!),
          mealTypeId: mealTypes.find((type) => type.name === newType)?.id,
        },
      });
    },
    [dateRange, mealTypes, updateMealMutation]
  );

  const buildBoard = useCallback(
    (meals: MealWithMacros[]): MealsByDayType => {
      const board: MealsByDayType = {};
      DAYS.forEach((d) => {
        board[d] = {};
        mealTypes.forEach((t) => (board[d][t.name] = []));
      });

      meals.forEach((meal) => {
        const type = meal.mealType;
        const date = meal.plannedDate ? new Date(meal.plannedDate) : null;
        const day = getDayFromDate(date!);
        if (!board[day]) {
          board[day] = {};
        }
        if (!board[day][type!.name]) {
          board[day][type!.name] = [];
        }

        board[day][type!.name].push(meal);
      });

      return board;
    },
    [mealTypes]
  );

  const [board, setBoard] = useState<MealsByDayType>(() => buildBoard(meals));

  useEffect(() => {
    setBoard(() => buildBoard(meals));
  }, [meals, buildBoard]);

  const { sensors, activeId, handleDragStart, handleDragEnd } = useMealDragDrop(
    board,
    setBoard,
    onMealUpdate,
    dateRange
  );

  const handleDateChange = useCallback(
    async (range: DateRange) => {
      setDateRange(range);
      await mealsQuery.refetch();
    },
    [mealsQuery]
  );

  const currentDay = getDay(dateRange.from!);

  return (
    <>
      <WeekNavigator setRange={handleDateChange} currentRange={dateRange} />

      <div className="space-y-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {mealsQuery.isPending ? (
            <Spinner />
          ) : (
            [...Array(DAYS.length).keys()].map((i) => {
              const day = DAYS[(currentDay + i) % DAYS.length];
              return (
                <DayRow
                  key={getDateFromDay(dateRange, day).toString()}
                  plannedDate={(() => getDateFromDay(dateRange, day))()}
                  mealsByType={board[day]}
                  mealTypes={mealTypes}
                  mealPlanId={mealPlan.id}
                />
              );
            })
          )}

          <DragOverlay>
            {activeId ? (
              <DraggedMealOverlay mealId={activeId} board={board} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
      <MealPlanOverview meals={meals} />
    </>
  );
}
