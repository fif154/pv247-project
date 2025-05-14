'use client';

import { Ingredient } from '@/server/entities/models/ingredient';
import { User } from 'next-auth';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { IngredientDetails } from './ingredient-details';
import { EditIngredientForm } from './edit-ingredient-form';
import { DeleteIngredientDialog } from './delete-ingredient-dialog';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type IngredientModalProps = {
  ingredient: Ingredient;
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
};

export function IngredientModal({
  ingredient,
  isOpen,
  onClose,
  currentUser,
}: IngredientModalProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const canEdit = true;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader className="flex flex-row items-center justify-between mb-2">
            <DialogTitle>{ingredient.name}</DialogTitle>
            {canEdit && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditMode(true)}
                  className="flex items-center gap-1"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteDialogOpen(true)}
                  className="flex items-center gap-1 text-destructive hover:text-destructive mr-4"
                >
                  <Trash className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            )}
          </DialogHeader>
          {isEditMode ? (
            <EditIngredientForm
              ingredient={ingredient}
              onSuccess={() => {
                setIsEditMode(false);
                window.location.reload();
              }}
            />
          ) : (
            <IngredientDetails ingredient={ingredient} />
          )}
        </DialogContent>
      </Dialog>

      <DeleteIngredientDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        ingredientId={ingredient.id}
        ingredientName={ingredient.name}
        onDeleted={() => {
          onClose();
          window.location.reload();
        }}
      />
    </>
  );
}
