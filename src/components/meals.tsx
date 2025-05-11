import { listMealsAction } from '@/app/meals/actions';
import { MealCard } from './meal-card';

export const Meals = async () => {
  const meals = await listMealsAction();

  return (
    <div className="grid gap-6">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </div>
  );
};
