import type { MealsByDayType } from '@/types/meal-planning';
import { DAYS } from '@/types/meal-planning';
import { useMemo } from 'react';

interface DraggedMealOverlayProps {
  mealId: string;
  board: MealsByDayType;
}

export function DraggedMealOverlay({ mealId, board }: DraggedMealOverlayProps) {
  const meal = useMemo(() => {
    for (const day of DAYS) {
      for (const type in board[day]) {
        const found = board[day][type].find((m) => m.id === mealId);
        if (found) return found;
      }
    }
    return null;
  }, [mealId, board]);

  if (!meal) return null;

  return (
    <div className="rounded-md border bg-card p-2 shadow-sm">
      <div className="font-medium">{meal.name}</div>
    </div>
  );
}
