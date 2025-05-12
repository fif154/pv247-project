'use client';

import { Recipe } from '@/server/entities/models/recipe';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/auth/recipes/${recipe.id}`} className="group">
      <Card className="h-full transition-all duration-200 group-hover:shadow-lg group-hover:translate-y-[-4px] relative overflow-hidden">
        {recipe.image && (
          <div className="w-full h-40 relative">
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h3 className="absolute bottom-2 left-3 text-white font-semibold text-lg">
              {recipe.name}
            </h3>
          </div>
        )}
        <CardHeader className={recipe.image ? "pt-3 pb-2" : "pb-2"}>
          {!recipe.image && <CardTitle className="text-lg">{recipe.name}</CardTitle>}
          <div className="flex items-center text-xs text-muted-foreground">
            <span>Servings: {recipe.servings}</span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {recipe.description || 'No description available'}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}