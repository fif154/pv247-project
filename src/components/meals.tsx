import { Meal } from '@/server/entities/models/meal';
import { MealCard } from './meal-card';

type MealsProps = {
  meals: Meal[];
};

export const Meals = async ({ meals }: MealsProps) => {
  return (
    <div className="grid gap-6">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </div>
  );
};
