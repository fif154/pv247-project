import { RecipeForm } from '@/components/recipes/recipe-form';
import { getInjection } from '@/server/di/container';

export default async function CreateRecipePage() {
  const unitsController = getInjection('IListUnitsController');
  const units = await unitsController();
  
  return <RecipeForm units={units} />;
}