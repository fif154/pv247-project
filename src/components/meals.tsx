import { MealWithMacros } from '@/server/entities/models/meal';
import { MealCardList } from './meal-card-list';
import { listMealTypes } from '@/app/auth/meal-types/actions';

type MealsProps = {
  meals: MealWithMacros[];
};

export const Meals = async ({ meals }: MealsProps) => {
  const mealTypes = await listMealTypes();

  return (
    <div className="flex flex-col gap-4 w-full">
      {mealTypes.map((mealType) => (
        <div key={mealType.id}>
          <MealCardList
            mealType={mealType.name}
            meals={meals.filter((meal) => meal.mealType?.id === mealType.id)}
          />
        </div>
      ))}
    </div>
  );
};
