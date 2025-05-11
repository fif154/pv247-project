'use client';

import { navItems } from '@/config/nav';
import { useCreateDialog } from '@/hooks/use-create-dialog';
import { Plus } from 'lucide-react';
import { FloatingButton } from './floating-button';

export const mobileNavHeight = 'h-16';

export function MobileNav() {
  const { setOpen, CreateDialog } = useCreateDialog();

  return (
    <>
      <div className="fixed bottom-0 left-0 z-50 w-full border-t border-border bg-background md:hidden">
        <div className={`grid ${mobileNavHeight} grid-cols-4`}>
          {navItems.slice(0, 4).map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1"
            >
              <item.icon className="h-5 w-5 text-foreground" />
              <span className="text-xs text-foreground">{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      <FloatingButton
        size="icon"
        className="md:hidden"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">Add new</span>
      </FloatingButton>

      <CreateDialog />
    </>
  );
}
