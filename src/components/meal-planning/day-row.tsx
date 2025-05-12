import type { MealWithMacros } from '@/server/entities/models/meal';
import { MealType } from '@/server/entities/models/meal-type';
import { getDayFromDate } from '../meal-planning';
import { MealTypeColumn } from './meal-type-column';

interface DayRowProps {
  plannedDate: Date;
  mealsByType: Record<string, MealWithMacros[]>;
  mealTypes: MealType[];
  mealPlanId?: string;
}

export function DayRow({
  plannedDate,
  mealsByType,
  mealTypes,
  mealPlanId,
}: DayRowProps) {
  let calories = 0;
  let protein = 0;
  let carbs = 0;
  let fat = 0;
  mealTypes.forEach((type) => {
    if (!mealsByType[type.name]) {
      return;
    }

    mealsByType[type.name].forEach((meal) => {
      calories += meal.macros.calories ?? 0;
      protein += meal.macros.protein ?? 0;
      carbs += meal.macros.carbs ?? 0;
      fat += meal.macros.fats ?? 0;
    });
  });

  const day = getDayFromDate(plannedDate);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{day}</h3>
        <div className="text-sm text-muted-foreground">
          <span className="font-bold">{calories.toFixed()}</span> kcal |{' '}
          <span className="font-bold">{protein.toFixed()}</span> g protein |{' '}
          <span className="font-bold">{carbs.toFixed()}</span> g carbs |{' '}
          <span className="font-bold">{fat.toFixed()}</span> g fat
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mealTypes.map((type) => (
          <MealTypeColumn
            key={`${day}-${type.name}`}
            plannedDate={plannedDate}
            type={type}
            meals={mealsByType[type.name] ?? []}
            mealPlanId={mealPlanId}
          />
        ))}
      </div>
    </div>
  );
}
