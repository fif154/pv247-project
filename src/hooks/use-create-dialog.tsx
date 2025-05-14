'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useCreateDialog = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const CreateDialog = () => (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New</DialogTitle>
          <DialogDescription>What would you like to create?</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
              router.push('/auth/recipes/new');
            }}
          >
            New Recipe
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
              router.push('/auth/meal-plans/new');
            }}
          >
            New Meal Plan
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
              router.push('/auth/grocery-lists/new');
            }}
          >
            New Grocery Item
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return {
    open,
    setOpen,
    CreateDialog,
  };
};
