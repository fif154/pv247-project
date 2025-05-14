'use client';

import { Recipe } from '@/server/entities/models/recipe';
import Link from 'next/link';
import Image from 'next/image';

export function RecipeListItem({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/auth/recipes/${recipe.id}`} className="group">
      <div className="flex items-center p-4 border rounded-lg transition-all duration-200 hover:shadow-md hover:bg-accent/5">
        {recipe.image && (
          <div className="h-16 w-16 relative rounded-md overflow-hidden mr-4 flex-shrink-0">
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-lg truncate">{recipe.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {recipe.description || 'No description available'}
          </p>
          <div className="text-xs text-muted-foreground mt-1">
            <span>Servings: {recipe.servings}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
