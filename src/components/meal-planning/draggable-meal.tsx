'use client';

import { Badge } from '@/components/ui/badge';
import type { MealWithMacros } from '@/server/entities/models/meal';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { memo } from 'react';
import { MealDropdown } from './meal-dropdown';

interface DraggableMealProps {
  meal: MealWithMacros;
}

const MealCard = memo(function MealCard({ meal }: { meal: MealWithMacros }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="font-medium">{meal.name}</div>
        <MealDropdown meal={meal} />
      </div>

      <div className="mt-1 flex items-center gap-2 flex-wrap">
        <Badge variant="outline" className="text-xs">
          {meal?.macros.calories} cal
        </Badge>
        <Badge variant="outline" className="text-xs">
          {meal?.macros.protein} g protein
        </Badge>
      </div>
    </>
  );
});

export const DraggableMeal = memo(function Component({
  meal,
}: DraggableMealProps) {
  const { setNodeRef, attributes, listeners, transform, isDragging } =
    useDraggable({ id: meal.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      {...listeners}
      {...attributes}
      className={`group cursor-move rounded-md border bg-card p-2 shadow-sm select-none ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <MealCard meal={meal} />
    </div>
  );
});
