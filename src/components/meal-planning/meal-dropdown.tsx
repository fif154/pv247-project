import { Meal } from '@/server/entities/models/meal';

import { useDeleteMealMutation } from '@/mutations/meals';
import { MoreHorizontal, PenIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { AddMealModal } from './add-meal-modal';

export const MealDropdown = ({ meal }: { meal: Meal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const deleteMealMutation = useDeleteMealMutation();

  const [isAddMealModalOpen, setIsAddMealModalOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-100"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setIsAddMealModalOpen(true)}>
              <PenIcon className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => deleteMealMutation.mutateAsync(meal.id)}
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {isAddMealModalOpen ? (
        <AddMealModal
          modalOpen={isAddMealModalOpen}
          setModalOpen={() => {
            // https://github.com/shadcn-ui/ui/issues/468
            setTimeout(() => {
              document.body.style.pointerEvents = '';
            }, 100);
            setIsAddMealModalOpen(false);
          }}
          meal={meal}
          plannedDate={meal.plannedDate!}
          mealType={meal.mealType!}
          modal={isAddMealModalOpen}
        />
      ) : null}
    </>
  );
};
