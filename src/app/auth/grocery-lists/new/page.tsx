import { listMealPlansAction } from '@/app/auth/meal-plans/actions';
import { GroceryListCreateForm } from '@/components/forms/grocery-list/grocery-list-create';
import { PageHeader } from '@/components/page-header';
import { Loading } from '@/components/ui/loading';
import { Suspense } from 'react';
import { listRecipes } from '../../recipes/actions';

async function CreateFormContent() {
  const [recipes, mealPlans] = await Promise.all([
    listRecipes(),
    listMealPlansAction(),
  ]);

  return <GroceryListCreateForm recipes={recipes} mealPlans={mealPlans} />;
}

const Page = () => {
  return (
    <div className="flex flex-col h-screen gap-4">
      <div className="flex flex-row justify-between items-center">
        <PageHeader>Create a grocery list</PageHeader>
      </div>

      <Suspense fallback={<Loading />}>
        <CreateFormContent />
      </Suspense>
    </div>
  );
};

export default Page;
