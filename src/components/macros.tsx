import { auth } from '@/auth';
import { MacroItem } from './macro-item';
import { Card, CardContent } from './ui/card';
import { getUserAction } from '@/app/(users)/actions';

type Props = {
  carbs: number;
  protein: number;
  fat: number;
  calories: number;
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

export const Macros = async (props: Props) => {
  const session = await auth();
  const userId = session?.user.id;
    if (!userId) {
    throw new Error('User not found, this should not happen');
  }
const user = await getUserAction(userId);

  const macroItems: MacroItemType[] = [
    {
      label: 'Calories',
      value: props.calories,
      userSetting: user?.calories ?? 2000,
      bgColor: macroBgColors.calories,
      textColor: macroTextColors.calories,
      unit: 'kcal',
      // Fallback = daily recommended intake
      percentage: props.calories / (user?.calories ?? 2000),
    },
    {
      label: 'Carbs',
      value: props.carbs,
      userSetting: user?.carbs ?? 270,
      bgColor: macroBgColors.carbs,
      textColor: macroTextColors.carbs,
      unit: 'g',
      percentage: props.carbs / (user?.carbs ?? 270),
    },
    {
      label: 'Protein',
      value: props.protein,
      userSetting: user?.protein ?? 50,
      bgColor: macroBgColors.protein,
      textColor: macroTextColors.protein,
      unit: 'g',
      percentage: props.protein / (user?.protein ?? 50),
    },
    {
      label: 'Fat',
      value: props.fat,
      userSetting: user?.fats ?? 70,
      bgColor: macroBgColors.fat,
      textColor: macroTextColors.fat,
      unit: 'g',
      percentage: props.fat / (user?.fats ?? 70),
    },
  ];
  return (
    <Card className="w-full">
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
