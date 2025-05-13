'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MealWithMacros } from '@/server/entities/models/meal';
import Image from 'next/image';

export const macroTextColors = {
  calories: 'text-macro-calories',
  carbs: 'text-macro-carbs',
  protein: 'text-macro-protein',
  fat: 'text-macro-fat',
};

type Props = {
  meal: MealWithMacros;
};

export function MealCard({ meal }: Props) {
  const macros = meal.macros;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium text-primary">
          {meal.mealType?.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          {meal.image ? (
            <div className="relative h-20 w-20 overflow-hidden rounded-md">
              <Image
                src={meal.image}
                alt={meal.name}
                fill
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="flex-1">
            <h3 className="font-medium text-lg text-primary">{meal.name}</h3>
            <div className="mt-2 flex flex-wrap gap-4">
              <div className="flex items-center gap-1">
                <span
                  className={`text-s font-medium ${macroTextColors.calories}`}
                >
                  {macros.calories} kcal
                </span>
                <span className="text-s text-muted-foreground">kcal</span>
              </div>
              <div className="flex items-center gap-1">
                <span
                  className={`text-s font-medium ${macroTextColors.protein}`}
                >
                  {macros.protein} g
                </span>
                <span className="text-s text-muted-foreground">protein</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-s font-medium ${macroTextColors.carbs}`}>
                  {macros.carbs} g
                </span>
                <span className="text-s text-muted-foreground">carbs</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-s font-medium ${macroTextColors.fat}`}>
                  {macros.fats} g
                </span>
                <span className="text-s text-muted-foreground">fats</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
