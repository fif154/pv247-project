import { Loading } from '@/components/ui/loading';
import { Suspense } from 'react';

export const metadata = {
  title: 'Ingredients | MealMate',
  description: 'Browse, manage, and organize ingredients used in your meals.',
};

async function IngredientsList() {
  // TODO: Add ingredients fetching logic here
  return (
    <div className="flex flex-col gap-4">
      {/* TODO: Add ingredients list component here */}
    </div>
  );
}

const Page = () => {
  return (
    <div className="flex flex-col h-screen gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Ingredients</h1>
      </div>
      <Suspense fallback={<Loading />}>
        <IngredientsList />
      </Suspense>
    </div>
  );
};

export default Page;
