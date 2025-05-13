import { listMealsForDayAction } from '@/app/meals/actions';
import { MealCard } from './meal-card';

type MealsProps = {
  date: Date;
};

export const Meals = async ({date}: MealsProps) => {
  const meals = await listMealsForDayAction(date);

  return (
    <div className="grid gap-6">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </div>
  );
};
