import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';
import { Button } from './ui/button';

export const FloatingButton = ({
  children,
  className,
  ...props
}: ComponentProps<typeof Button>) => {
  return (
    <Button
      size="icon"
      className={cn(
        className,
        'fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full bg-coral text-coral-foreground shadow-lg md:hidden hover:bg-coral-hover'
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
