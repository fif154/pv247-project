'use client';
import { cn } from '@/lib/utils';
import { MacroItem } from './macro-item';
import { Card, CardContent } from './ui/card';
import { useSession } from 'next-auth/react';
import { useUser } from '@/queries/users';

type Props = {
  carbs: number;
  protein: number;
  fat: number;
  calories: number;
  intakeMultiplier?: number;
  className?: string;
  userSettings?: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
};

export type MacroItemType = {
  label: string;
  value: number;
  userSetting: number;
  bgColor: string;
  textColor: string;
  unit: 'kcal' | 'g';
  percentage: number;
};

export const macroTextColors = {
  calories: 'text-macro-calories',
  carbs: 'text-macro-carbs',
  protein: 'text-macro-protein',
  fat: 'text-macro-fat',
};

export const macroBgColors = {
  calories: 'bg-macro-calories',
  carbs: 'bg-macro-carbs',
  protein: 'bg-macro-protein',
  fat: 'bg-macro-fat',
};

export const Macros = (props: Props) => {
  const { data: session } = useSession();
  const { data } = useUser(session?.user.id ?? '');
  const macroItems: MacroItemType[] = [
    {
      label: 'Calories',
      value: props.calories,
      userSetting: data?.calories ?? 2000,
      bgColor: macroBgColors.calories,
      textColor: macroTextColors.calories,
      unit: 'kcal',
      // Fallback = adjusted daily recommended intake
      percentage:
        props.calories /
        (data?.calories ?? 2000 * (props.intakeMultiplier ?? 1)),
    },
    {
      label: 'Carbs',
      value: props.carbs,
      userSetting: data?.carbs ?? 270,
      bgColor: macroBgColors.carbs,
      textColor: macroTextColors.carbs,
      unit: 'g',
      percentage:
        props.carbs / (data?.carbs ?? 270 * (props.intakeMultiplier ?? 1)),
    },
    {
      label: 'Protein',
      value: props.protein,
      userSetting: data?.protein ?? 50,
      bgColor: macroBgColors.protein,
      textColor: macroTextColors.protein,
      unit: 'g',
      percentage:
        props.protein / (data?.protein ?? 50 * (props.intakeMultiplier ?? 1)),
    },
    {
      label: 'Fat',
      value: props.fat,
      userSetting: data?.fats ?? 70,
      bgColor: macroBgColors.fat,
      textColor: macroTextColors.fat,
      unit: 'g',
      percentage:
        props.fat / (data?.fats ?? 70 * (props.intakeMultiplier ?? 1)),
    },
  ];
  return (
    <Card className={cn('w-full', props.className)}>
      <CardContent className="px-4 py-2">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {macroItems.map((item) => (
            <MacroItem key={item.label} {...item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
