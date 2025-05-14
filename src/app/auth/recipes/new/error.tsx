'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function CreateRecipeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 space-y-4">
      <h2 className="text-2xl font-bold text-destructive">
        Error Creating Recipe
      </h2>
      <p className="text-muted-foreground max-w-md text-center">
        We encountered an error while trying to create your recipe. Please try
        again.
      </p>
      <p className="text-sm text-muted-foreground/60">Error: {error.message}</p>
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
