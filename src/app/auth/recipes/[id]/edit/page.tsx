import { getRecipe } from '@/app/auth/recipes/actions';
import { RecipeForm } from '@/components/recipes/recipe-form';
import { auth } from '@/auth';
import { notFound, redirect } from 'next/navigation';
import { getInjection } from '@/server/di/container';
import { canEditRecipe } from '@/server/application/policy/recipe';

export default async function EditRecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const [recipe, session, units] = await Promise.all([
    getRecipe(id),
    auth(),
    getInjection('IListUnitsController')(),
  ]);

  if (!recipe) {
    notFound();
  }

  if (!session?.user || !canEditRecipe(recipe, session.user)) {
    redirect('/auth/recipes');
  }

  return <RecipeForm recipe={recipe} isEditMode={true} units={units} />;
}