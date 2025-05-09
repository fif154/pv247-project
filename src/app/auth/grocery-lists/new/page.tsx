import { listMealPlansAction } from '@/app/meal-plans/actions';
import { GroceryListCreateForm } from '@/components/forms/grocery-list/grocery-list-create';
import { PageHeader } from '@/components/page-header';
import { listRecipes } from '../../recipes/actions';

const Page = async () => {
  const [recipes, mealPlans] = await Promise.all([
    listRecipes(),
    listMealPlansAction(),
  ]);

  return (
    <div className="flex flex-col h-screen gap-4">
      <div className="flex flex-row justify-between items-center">
        <PageHeader>Create a grocery list</PageHeader>
      </div>

      <GroceryListCreateForm recipes={recipes} mealPlans={mealPlans} />
    </div>
  );
};

export default Page;
