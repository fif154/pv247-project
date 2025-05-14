'use client';

import { MealWithMacros } from '@/server/entities/models/meal';
import { useRouter } from 'next/navigation';
import { MealCard } from './meal-card';
import { Button } from './ui/button';

type MealCardListProps = {
  meals: MealWithMacros[];
  mealType: string;
};

export const MealCardList = ({ meals, mealType }: MealCardListProps) => {
  const router = useRouter();

  return (
    <div>
      <span className="text-lg font-semibold text-primary">{mealType}</span>
      <div className="grid gap-6">
        {meals.length === 0 ? (
          <Button
            variant="outline"
            className="mt-4 md:w-1/4"
            onClick={() => router.push('/auth/meal-plans')}
          >
            {`Add ${mealType}`}
          </Button>
        ) : (
          meals.map((meal) => <MealCard key={meal.id} meal={meal} />)
        )}
      </div>
    </div>
  );
};
