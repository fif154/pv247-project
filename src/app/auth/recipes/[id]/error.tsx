'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RecipeDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  
  useEffect(() => {
    console.error('Recipe detail error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 space-y-4">
      <h2 className="text-2xl font-bold text-destructive">Recipe not found!</h2>
      <p className="text-muted-foreground max-w-md text-center">
        We couldn't find the recipe you're looking for. It may have been deleted or you might not have permission to view it.
      </p>
      <p className="text-sm text-muted-foreground/60">
        Error: {error.message}
      </p>
      <div className="flex gap-4">
        <Button onClick={reset} variant="outline">
          Try again
        </Button>
        <Button onClick={() => router.push('/auth/recipes')} variant="default">
          Back to recipes
        </Button>
      </div>
    </div>
  );
}