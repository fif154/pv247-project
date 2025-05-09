import { getRecipe } from '@/app/auth/recipes/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const RecipeDetailPage = async ({ params }: { params: { id: string } }) => {
  const recipe = await getRecipe(params.id);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-4xl font-bold">{recipe.name}</h1>
        <div className="flex gap-2">
          <Link href={`/auth/recipes/${recipe.id}/edit`}>
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="icon" className="text-destructive">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
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
                        {item.quantity} {item.unit?.name}
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