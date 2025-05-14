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
              <div className="ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsEditMode(true)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDeleteDialogOpen(true)}
                      className="text-destructive"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </DialogHeader>
          {isEditMode ? (
            <EditIngredientForm
              ingredient={ingredient}
              onSuccess={() => {
                setIsEditMode(false);
                // Force a reload of the ingredient list
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
