import { Ingredient } from '@/server/entities/models/ingredient';
import { useMemo } from 'react';

type Category = {
  id: string;
  name: string;
  count: number;
};

export function useCategoriesForFilter(ingredients: Ingredient[]) {
  const categories = useMemo(() => {
    const categoriesMap = new Map<string, Category>();

    ingredients.forEach((ingredient) => {
      if (ingredient.category) {
        const { id, name } = ingredient.category;
        if (categoriesMap.has(id)) {
          const current = categoriesMap.get(id)!;
          categoriesMap.set(id, { ...current, count: current.count + 1 });
        } else {
          categoriesMap.set(id, { id, name, count: 1 });
        }
      }
    });

    return Array.from(categoriesMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [ingredients]);

  return { categories };
}
