import { Button } from '@/components/ui/button';
import type { MealWithMacros } from '@/server/entities/models/meal';
import { MealType } from '@/server/entities/models/meal-type';
import { useDroppable } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { getDayFromDate } from '../meal-planning';
import { AddMealModal } from './add-meal-modal';
import { DraggableMeal } from './draggable-meal';

interface MealTypeColumnProps {
  plannedDate: Date;
  type: MealType;
  meals: MealWithMacros[];
  mealPlanId?: string;
}

export function MealTypeColumn({
  plannedDate,
  type,
  meals,
  mealPlanId,
}: MealTypeColumnProps) {
  const day = getDayFromDate(plannedDate);
  const { setNodeRef, isOver } = useDroppable({
    id: `${day}__${type.name}`,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">{type.name}</div>

      <div
        ref={setNodeRef}
        className={`min-h-[100px] rounded-md border border-dashed p-2 transition-colors ${
          isOver ? 'bg-muted/60' : ''
        }`}
      >
        <div className="flex flex-col gap-4">
          {meals.length ? (
            <div className="space-y-2">
              {meals.map((meal) => (
                <DraggableMeal key={meal.id} meal={meal} />
              ))}
            </div>
          ) : null}

          <div className="flex h-full flex-col items-center justify-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="mr-1 h-4 w-4" />
              Add {type.name}
            </Button>
          </div>
        </div>
      </div>

      <AddMealModal
        modalOpen={isModalOpen}
        setModalOpen={setIsModalOpen}
        plannedDate={plannedDate}
        mealType={type}
        mealPlanId={mealPlanId}
      />
    </div>
  );
}
