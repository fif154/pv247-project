'use client';

import { useDeleteIngredientMutation } from '@/mutations/ingredients';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Spinner } from '../ui/spinner';
import { useState } from 'react';

type DeleteIngredientDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  ingredientId: string;
  ingredientName: string;
  onDeleted?: () => void;
};

export function DeleteIngredientDialog({
  isOpen,
  onClose,
  ingredientId,
  ingredientName,
  onDeleted,
}: DeleteIngredientDialogProps) {
  const deleteMutation = useDeleteIngredientMutation();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteMutation.mutateAsync(ingredientId);
      if (onDeleted) {
        onDeleted();
      }
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the ingredient &quot;{ingredientName}
            &quot;. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? <Spinner /> : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
