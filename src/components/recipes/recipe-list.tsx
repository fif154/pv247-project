'use client';
import React from 'react';

import { Recipe } from '@/server/entities/models/recipe';
import { RecipeCard } from './recipe-card';
import { RecipeListItem } from './recipe-list-item';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export function RecipeList({ recipes }: { recipes: Recipe[] }) {
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'grid';
  const searchQuery = searchParams.get('search') || '';
  const sortType = searchParams.get('sort') || 'name-asc';

  // Filter and sort recipes
  const displayedRecipes = React.useMemo(() => {
    // First filter by search query
    const filtered = searchQuery 
      ? recipes.filter(recipe => 
          recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (recipe.description && recipe.description.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : recipes;
    
    // Then sort the filtered results
    return [...filtered].sort((a, b) => {
      switch (sortType) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'newest':
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
        case 'oldest':
          return new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime();
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [recipes, searchQuery, sortType]);

  return (
    <div className="flex-1 overflow-auto">
      {displayedRecipes.length === 0 ? (
        <div className="text-center py-16 max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery
              ? 'No recipes match your search criteria. Try a different search term.'
              : 'Start by creating your first recipe'}
          </p>
          <Button variant="coral">
            <Link href="/auth/recipes/new" className="flex items-center gap-2">
              <Plus />
              <span>Create Recipe</span>
            </Link>
          </Button>
        </div>
      ) : (
        <>
          {view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {displayedRecipes.map((recipe) => (
                <RecipeListItem key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
