import { RecipeForm } from '@/components/recipes/recipe-form';
import { listUnits } from '../../units/actions';

export default async function CreateRecipePage() {
  const units = await listUnits();

  return <RecipeForm units={units} />;
}
