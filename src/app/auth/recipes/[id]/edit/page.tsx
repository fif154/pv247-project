import { getRecipe } from '@/app/auth/recipes/actions';
import { RecipeForm } from '@/components/recipes/recipe-form';
import { auth } from '@/auth';
import { notFound, redirect } from 'next/navigation';
import { getInjection } from '@/server/di/container';
import { canEditRecipe } from '@/server/application/policy/recipe';

export default async function EditRecipePage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // Fetch both the recipe and units in parallel
  const [recipe, session, units] = await Promise.all([
    getRecipe(id),
    auth(),
    getInjection('IListUnitsController')(),
  ]);

  if (!recipe) {
    notFound();
  }

  // Check if user is authorized to edit this recipe
  if (!session?.user || !canEditRecipe(recipe, session.user)) {
    redirect('/auth/recipes');
  }

  return <RecipeForm recipe={recipe} isEditMode={true} units={units} />;
}