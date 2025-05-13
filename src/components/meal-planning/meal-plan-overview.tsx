import { useCreateGroceryListMutation } from '@/mutations/grocery-lists';
import { useCopyMealsToDateRangeMutation } from '@/mutations/meal-plans';
import { MealWithMacros } from '@/server/entities/models/meal';
import { addWeeks, format } from 'date-fns';
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
  const copyMealsToDateRangeMutation = useCopyMealsToDateRangeMutation();
  // Its the same mutation, using it just to distuingish the loading state
  const copyMealsToDateRangeMutationRandomize =
    useCopyMealsToDateRangeMutation();

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

  const handleCopyMeals = async () => {
    await copyMealsToDateRangeMutation.mutateAsync({
      mealPlanId,
      sourceDateRange: dateRange,
      targetDateRange: {
        from: addWeeks(dateRange.from!, 1),
        to: addWeeks(dateRange.to!, 1),
      },
    });
  };

  const handleCopyMealsRandomize = async () => {
    await copyMealsToDateRangeMutationRandomize.mutateAsync({
      mealPlanId,
      sourceDateRange: dateRange,
      targetDateRange: {
        from: addWeeks(dateRange.from!, 1),
        to: addWeeks(dateRange.to!, 1),
      },
      randomize: true,
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
          <CardTitle>Handy actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 flex-col">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleCreateGroceryList}
          >
            {createGroceryListMutation.isPending
              ? 'Creating grocery list...'
              : 'Create grocery list for this week'}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleCopyMeals}
          >
            {copyMealsToDateRangeMutation.isPending
              ? 'Copying meals...'
              : 'Copy meals to next week'}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleCopyMealsRandomize}
          >
            {copyMealsToDateRangeMutation.isPending
              ? 'Copying meals...'
              : 'Copy meals to next week and randomize'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
