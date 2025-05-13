'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { deleteRecipe } from '@/app/auth/recipes/actions';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { showSuccessToast } from '@/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function DeleteRecipeButton({ 
  recipeId, 
  recipeName 
}: { 
  recipeId: string; 
  recipeName: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteRecipe({ id: recipeId }),
    onSuccess: () => {
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      
      setOpen(false);
      showSuccessToast('Recipe deleted successfully');
      router.push('/auth/recipes');
    },
    onError: (error) => {
      console.error('Failed to delete recipe:', error);
    }
  });

  const handleDelete = () => {
    mutate();
  };

  return (
    <>
      <Button 
        variant="outline" 
        className="text-destructive hover:bg-destructive/10"
        onClick={() => setOpen(true)}
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Recipe</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{recipeName}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-4 sm:space-x-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}