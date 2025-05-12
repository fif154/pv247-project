import { MealWithMacros } from '@/server/entities/models/meal';
import { Macros } from '../macros';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const MealPlanOverview = ({ meals }: { meals: MealWithMacros[] }) => {
  const totalCalories = meals.reduce(
    (acc, meal) => acc + (meal.macros.calories ?? 0),
    0
  );
  const totalProtein = meals.reduce(
    (acc, meal) => acc + (meal.macros.protein ?? 0),
    0
  );
  const totalCarbs = meals.reduce(
    (acc, meal) => acc + (meal.macros.carbs ?? 0),
    0
  );
  const totalFat = meals.reduce(
    (acc, meal) => acc + (meal.macros.fats ?? 0),
    0
  );

  return (
    <div className="flex flex-row gap-6">
      <Card className="flex w-1/2 flex-col gap-2">
        <CardHeader>
          <CardTitle>Meal plan overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Macros
            calories={totalCalories}
            protein={totalProtein}
            carbs={totalCarbs}
            fat={totalFat}
            //   7 days in a week
            intakeMultiplier={7}
          />
        </CardContent>
      </Card>
    </div>
  );
};
