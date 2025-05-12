import { getRecipe } from '@/app/auth/recipes/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import { DeleteRecipeButton } from '@/components/recipes/delete-recipe-button';
import { getInjection } from '@/server/di/container';
import { canEditRecipe } from '@/server/application/policy/recipe';

const RecipeDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const recipe = await getRecipe(id);
  const session = await auth();

  // Function for fetchin unit names
  async function fetchAllUnits() {
    const unitsController = getInjection('IListUnitsController');
    return await unitsController();
  }

  // Fetch all units to map unit names
  const allUnits = await fetchAllUnits();

  // Create a map of unit IDs to names for quick lookup
  const unitMap = Object.fromEntries(
    allUnits.map((unit) => [unit.id, unit.name])
  );

  if (!recipe) {
    notFound();
  }

  // Check if current user is the creator of this recipe / can edit this recipe
  const canEdit = session?.user ? canEditRecipe(recipe, session.user) : false;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-4xl font-bold">{recipe.name}</h1>
        {canEdit && (
          <div className="flex gap-2">
            <Link href={`/auth/recipes/${recipe.id}/edit`}>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            <DeleteRecipeButton recipeId={recipe.id} recipeName={recipe.name} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {recipe.description || 'No description available'}
              </p>
              <div className="mt-4">
                <span className="font-medium">Servings: </span>
                <span className="text-muted-foreground">{recipe.servings}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          {recipe.image && (
            <Card className="overflow-hidden">
              <div className="relative w-full h-48">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              {recipe.ingredients && recipe.ingredients.length > 0 ? (
                <ul className="space-y-2">
                  {recipe.ingredients.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.ingredient?.name}</span>
                      <span className="text-muted-foreground">
                        {item.quantity} {unitMap[item.unitId] || 'unit'}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No ingredients listed</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
