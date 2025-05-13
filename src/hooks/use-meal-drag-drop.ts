import type { MealsByDayType } from '@/types/meal-planning';
import { DAYS } from '@/types/meal-planning';
import {
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

export function useMealDragDrop(
  board: MealsByDayType,
  setBoard: React.Dispatch<React.SetStateAction<MealsByDayType>>,
  onMealUpdate: (mealId: string, day: string, newType: string) => void,
  dateRange: DateRange
) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  const findMealLocation = (mealId: string): [string, string] | null => {
    for (const day of DAYS) {
      for (const type in board[day]) {
        if (board[day][type].some((m) => m.id === mealId)) return [day, type];
      }
    }
    return null;
  };

  const handleDragStart = (e: DragStartEvent) =>
    setActiveId(e.active.id as string);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return setActiveId(null);

    const [toDay, toType] = (over.id as string).split('__');
    const from = findMealLocation(active.id as string);
    if (!from) return setActiveId(null);

    const [fromDay, fromType] = from;
    if (fromDay === toDay && fromType === toType) return setActiveId(null);

    setBoard((prev) => {
      const draft: MealsByDayType = structuredClone(prev);

      const meal = draft[fromDay][fromType].find((m) => m.id === active.id)!;
      draft[fromDay][fromType] = draft[fromDay][fromType].filter(
        (m) => m.id !== active.id
      );

      if (!draft[toDay][toType]) {
        draft[toDay][toType] = [];
      }
      draft[toDay][toType].push(meal);

      return draft;
    });

    onMealUpdate(active.id as string, DAYS.find((d) => d === toDay)!, toType);
    setActiveId(null);
  };

  return {
    sensors,
    activeId,
    handleDragStart,
    handleDragEnd,
  };
}
