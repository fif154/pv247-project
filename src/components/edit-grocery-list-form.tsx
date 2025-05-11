'use client';

import { useAddGroceryListItemsMutation } from '@/mutations/grocery-lists';
import { GroceryList } from '@/server/entities/models/grocery-list';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, SaveIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FloatingButton } from './floating-button';
import { AddIngredientsManuallyForm } from './forms/grocery-list/add-ingredients-manually';
import {
  groceryListFormSchema,
  GroceryListFormValues,
  ingredientSchema,
} from './forms/grocery-list/schema';
import { Button } from './ui/button';
import { Form } from './ui/form';
import { Spinner } from './ui/spinner';

const editGroceryListFormSchema = groceryListFormSchema.extend({
  manualIngredients: z
    .array(ingredientSchema)
    .min(1, 'At least one ingredient is required'),
});
type EditGroceryListFormValues = z.infer<typeof editGroceryListFormSchema>;

export const EditGroceryListForm = ({
  groceryList,
}: {
  groceryList: GroceryList;
}) => {
  const form = useForm<EditGroceryListFormValues>({
    defaultValues: {
      name: groceryList.name,
      dateRange: {
        from: groceryList.fromDate ?? undefined,
        to: groceryList.toDate ?? undefined,
      },
    },
    resolver: zodResolver(editGroceryListFormSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const addGroceryListItemsMutation = useAddGroceryListItemsMutation();

  const onSubmit = async (data: GroceryListFormValues) => {
    await addGroceryListItemsMutation.mutateAsync({
      groceryListId: groceryList.id,
      items: data.manualIngredients ?? [],
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <AddIngredientsManuallyForm editMode />
        {errors.manualIngredients && (
          <p className="text-red-500">{errors.manualIngredients.message}</p>
        )}
        <Button
          type="submit"
          variant="coral"
          className="hidden md:flex"
          disabled={addGroceryListItemsMutation.isPending}
        >
          {addGroceryListItemsMutation.isPending ? (
            <Spinner />
          ) : (
            <>
              <Save /> Save
            </>
          )}
        </Button>
        <FloatingButton
          type="submit"
          disabled={addGroceryListItemsMutation.isPending}
        >
          {addGroceryListItemsMutation.isPending ? <Spinner /> : <SaveIcon />}
        </FloatingButton>
      </form>
    </Form>
  );
};
