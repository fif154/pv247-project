'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function RecipeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Recipe error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 space-y-4">
      <h2 className="text-2xl font-bold text-destructive">
        Something went wrong!
      </h2>
      <p className="text-muted-foreground max-w-md text-center">
        We encountered an error while loading your recipes.
      </p>
      <p className="text-sm text-muted-foreground/60">Error: {error.message}</p>
      <Button onClick={reset} variant="outline">
        Try again
      </Button>
    </div>
  );
}
