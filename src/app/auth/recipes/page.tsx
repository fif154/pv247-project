import { listRecipes } from '@/app/auth/recipes/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const RecipesPage = async () => {
  const recipes = await listRecipes();
  
  return (
    <div className="flex flex-col h-screen gap-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-4xl font-bold">Recipes</h1>
        <Button variant="coral">
          <Link href="/auth/recipes/new" className="flex items-center gap-2">
            <Plus />
            <span className="hidden md:block">Create Recipe</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
            <p className="text-muted-foreground mb-4">
              Start by creating your first recipe
            </p>
            <Button variant="coral">
              <Link href="/auth/recipes/new" className="flex items-center gap-2">
                <Plus />
                <span>Create Recipe</span>
              </Link>
            </Button>
          </div>
        ) : (
          recipes.map((recipe) => (
            <Link href={`/auth/recipes/${recipe.id}`} key={recipe.id}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{recipe.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {recipe.description || 'No description available'}
                  </p>
                  <div className="mt-4 text-sm">
                    <span className="text-muted-foreground">Servings: </span>
                    <span>{recipe.servings}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipesPage;