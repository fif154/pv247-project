import { RecipeForm } from '@/components/recipes/recipe-form';
import { listUnits } from '../../units/actions';

export const metadata = {
  title: 'Recipes | MealMate',
  description: 'Create new recipe on MealMate.',
};


export default async function CreateRecipePage() {
  const units = await listUnits();

  return <RecipeForm units={units} />;
}
