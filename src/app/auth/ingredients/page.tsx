import { auth } from '@/auth';
import { IngredientsGrid } from '@/components/ingredients/ingredients-grid';
import { PageHeader } from '@/components/page-header';
import { listIngredientsAction } from '@/app/auth/ingredients/actions';
import { redirect } from 'next/navigation';
import { Ingredient } from '@/server/entities/models/ingredient';

export const metadata = {
  title: 'Ingredients | MealMate',
  description:
    'Browse, add, and manage ingredients for your meal planning and recipes.',
};

const Page = async () => {
  const userSession = await auth();

  if (!userSession?.user) {
    redirect('/auth/login');
  }

  const ingredientsResult = await listIngredientsAction();

  const ingredients: Ingredient[] =
    'error' in ingredientsResult ? [] : ingredientsResult;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <PageHeader>Ingredients</PageHeader>
      </div>
      <IngredientsGrid
        ingredients={ingredients}
        currentUser={userSession.user}
      />
    </div>
  );
};

export default Page;
