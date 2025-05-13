import { useCreateGroceryListMutation } from '@/mutations/grocery-lists';
import { MealWithMacros } from '@/server/entities/models/meal';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Macros } from '../macros';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const MealPlanOverview = ({
  meals,
  dateRange,
  mealPlanId,
}: {
  meals: MealWithMacros[];
  dateRange: DateRange;
  mealPlanId: string;
}) => {
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

  const createGroceryListMutation = useCreateGroceryListMutation();

  const handleCreateGroceryList = () => {
    if (meals.length === 0) {
      return;
    }

    createGroceryListMutation.mutateAsync({
      data: {
        name: `Grocery list for ${format(dateRange.from!, 'dd. MM. yyyy')} - ${format(dateRange.to!, 'dd. MM. yyyy')}`,
        selectedMealPlans: [mealPlanId],
        dateRange: {
          from: dateRange.from!,
          to: dateRange.to!,
        },
      },
      mealDateRange: dateRange,
    });
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 w-full">
      <Card className="flex w-full flex-col gap-2">
        <CardHeader>
          <CardTitle>Meal plan overview</CardTitle>
        </CardHeader>
        <CardContent className="flex">
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
      <Card className="flex w-full flex-col gap-2">
        <CardHeader>
          <CardTitle>Create a grocery list for this week</CardTitle>
        </CardHeader>
        <CardContent className="flex">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleCreateGroceryList}
            disabled={createGroceryListMutation.isPending || meals.length === 0}
          >
            {createGroceryListMutation.isPending
              ? 'Creating grocery list...'
              : 'Create grocery list'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
