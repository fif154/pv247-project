import { listRecipes } from '@/app/auth/recipes/actions';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { RecipeControls } from '@/components/recipes/recipe-controls';
import { RecipeList } from '@/components/recipes/recipe-list';

export default async function RecipesPage() {
  // Fetch recipes on the server
  const recipes = await listRecipes();
  
  return (
    <div className="flex flex-col min-h-0 gap-6">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-4xl font-bold">Recipes</h1>
        <Button variant="coral">
          <Link href="/auth/recipes/new" className="flex items-center gap-2">
            <Plus />
            <span className="hidden md:block">Create Recipe</span>
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div>Loading controls...</div>}>
        <RecipeControls />
      </Suspense>

      <RecipeList recipes={recipes} />
    </div>
  );
}