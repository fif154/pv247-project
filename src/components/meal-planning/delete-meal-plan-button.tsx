'use client';

import { useDeleteMealPlanMutation } from '@/mutations/meal-plans';
import { Trash2Icon } from 'lucide-react';
import { Button } from '../ui/button';

export const DeleteMealPlanButton = ({ id }: { id: string }) => {
  const deleteMealPlanMutation = useDeleteMealPlanMutation();

  return (
    <Button
      asChild
      variant="outline"
      className="w-full md:w-auto hover:text-destructive"
      size="sm"
      onClick={() => {
        if (confirm('Are you sure you want to delete this meal plan?')) {
          deleteMealPlanMutation.mutate(id);
        }
      }}
    >
      <div>
        <Trash2Icon className="h-4 w-4" />
      </div>
    </Button>
  );
};
