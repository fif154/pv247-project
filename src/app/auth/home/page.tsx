import { Macros } from '@/components/macros';
import { Meals } from '@/components/meals';
import { PageHeader } from '@/components/page-header';
import { Loading } from '@/components/ui/loading';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { Suspense } from 'react';
import { AddNewButton } from './add-new-button';
import { listMealsAction } from '@/app/meals/actions';

const formatDate = (date: Date) => format(date, 'EEEE, MMMM d, yyyy');

const HomeContent = async () => {
  const today = new Date();
  const meals = await listMealsAction(undefined, { from: today, to: today });
  const totalMacros = meals.reduce(
    (acc, meal) => {
      acc.calories +=
        meal?.recipe?.ingredients?.reduce(
          (sum, ingredient) => sum + (ingredient.ingredient?.calories ?? 0),
          0
        ) || 0;
      acc.carbs +=
        meal?.recipe?.ingredients?.reduce(
          (sum, ingredient) => sum + (ingredient.ingredient?.carbs ?? 0),
          0
        ) || 0;
      acc.fat +=
        meal?.recipe?.ingredients?.reduce(
          (sum, ingredient) => sum + (ingredient.ingredient?.fats ?? 0),
          0
        ) || 0;
      acc.protein +=
        meal?.recipe?.ingredients?.reduce(
          (sum, ingredient) => sum + (ingredient.ingredient?.protein ?? 0),
          0
        ) || 0;
      return acc;
    },
    { calories: 0, carbs: 0, fat: 0, protein: 0 }
  );

  return (
    <div className="flex flex-col h-screen gap-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2">
          <PageHeader>Dashboard</PageHeader>
          <div className="flex items-center gap-2 text-[#7A8A9E]">
            <CalendarDays className="h-4 w-4" />
            <span>{formatDate(today)}</span>
          </div>
        </div>
        <AddNewButton />
      </div>
      <Suspense fallback={<Loading />}>
        <Macros
          calories={totalMacros.calories}
          carbs={totalMacros.carbs}
          fat={totalMacros.fat}
          protein={totalMacros.protein}
        />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Meals meals={meals} />
      </Suspense>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeContent />
    </Suspense>
  );
}
