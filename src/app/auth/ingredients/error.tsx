'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Ingredients page error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="text-muted-foreground text-center max-w-md">
        We could not load your ingredients. Please try again later or contact
        support if the issue persists.
      </p>
      <Button onClick={() => reset()} variant="default">
        <RefreshCw className="mr-2 h-4 w-4" /> Try again
      </Button>
    </div>
  );
}
