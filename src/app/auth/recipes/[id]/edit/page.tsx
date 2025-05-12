import { getRecipe } from '@/app/auth/recipes/actions';
import { RecipeForm } from '@/components/recipes/recipe-form';
import { auth } from '@/auth';
import { notFound, redirect } from 'next/navigation';

export default async function EditRecipePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [recipe, session] = await Promise.all([
    getRecipe(id),
    auth()
  ]);

  if (!recipe) {
    notFound();
  }

  // Check if user is authorized to edit this recipe
  if (session?.user?.id !== recipe.createdBy) {
    redirect('/auth/recipes');
  }

  return <RecipeForm recipe={recipe} isEditMode={true} />;
}