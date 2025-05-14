import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from './button';

interface ErrorPageProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
}

export function ErrorPage({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again later.',
  showHomeButton = true,
}: ErrorPageProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">{message}</p>
      {showHomeButton && (
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      )}
    </div>
  );
}
