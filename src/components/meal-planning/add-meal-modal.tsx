'use client';

import { SelectField } from '@/components/forms/select-field';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import {
  useCreateMealMutation,
  useUpdateMealMutation,
} from '@/mutations/meals';
import { useIngredients } from '@/queries/ingredients';
import { useMealTypes } from '@/queries/meal-types';
import { useRecipes } from '@/queries/recipes';
import { useUnits } from '@/queries/units';
import { Meal } from '@/server/entities/models/meal';
import { MealType } from '@/server/entities/models/meal-type';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { DatePickerSingle } from '../date-picker-single';

const identifiedNamedObject = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string(),
});

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  recipe: identifiedNamedObject,
  mealType: identifiedNamedObject,
  notes: z.string().optional(),
  image: z.string().optional(),
  plannedDate: z.date(),
  additionalIngredients: z.array(
    z.object({
      ingredient: identifiedNamedObject,
      quantity: z.number().min(0.1, 'Quantity must be greater than 0'),
      unit: identifiedNamedObject,
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

type AddMealModalProps = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  /**
   * When editing, `plannedDate` and `mealType` are ignored and the values from `meal` will be used instead.
   */
  plannedDate: Date;
  mealType: MealType;
  mealPlanId?: string;
  /**
   * If provided, the modal switches to **edit** mode and this meal will be updated instead of created.
   */
  meal?: Meal;
  modal?: boolean;
};

export const AddMealModal = ({
  modalOpen,
  setModalOpen,
  plannedDate,
  mealType,
  mealPlanId,
  meal,
  modal = true,
}: AddMealModalProps) => {
  const isEditMode = Boolean(meal);

  const { data: recipes = [] } = useRecipes();
  const { data: mealTypes = [] } = useMealTypes();
  const { data: ingredients = [] } = useIngredients();
  const { data: units = [] } = useUnits();
  const createMealMutation = useCreateMealMutation();
  const updateMealMutation = useUpdateMealMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: meal?.name ?? '',
      recipe: meal?.recipe ?? undefined,
      mealType: mealType,
      notes: meal?.notes ?? '',
      image: meal?.image ?? '',
      plannedDate: meal?.plannedDate ?? plannedDate,
      additionalIngredients:
        meal?.additionalIngredients?.map((ai) => ({
          ingredient: ai.ingredient!,
          quantity: ai.quantity,
          unit: ai.unit!,
        })) ?? undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'additionalIngredients',
  });

  const onSubmit = async (values: FormValues) => {
    if (isEditMode && meal) {
      await updateMealMutation.mutateAsync({
        mealId: meal.id,
        data: {
          ...values,
          recipeId: values.recipe.id,
          mealTypeId: values.mealType.id,
        },
        additionalIngredients: values.additionalIngredients.map(
          (ingredient) => ({
            ingredientId: ingredient.ingredient.id,
            quantity: ingredient.quantity,
            unitId: ingredient.unit.id,
          })
        ),
      });
    } else {
      await createMealMutation.mutateAsync({
        data: {
          ...values,
          recipeId: values.recipe.id,
          mealTypeId: values.mealType.id,
        },
        additionalIngredients: values.additionalIngredients.map(
          (ingredient) => ({
            ingredientId: ingredient.ingredient.id,
            quantity: ingredient.quantity,
            unitId: ingredient.unit.id,
          })
        ),
        mealPlanId,
      });
    }

    form.reset();
    setModalOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    setModalOpen(open);
  };

  return (
    <Dialog open={modalOpen} onOpenChange={handleOpenChange} modal={modal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Meal' : 'Add Meal'}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? `Editing meal planned for ${format(new Date(form.watch('plannedDate')), 'dd. MM. yyyy')} - ${form.watch('mealType').name}`
              : `Create a new meal for ${format(plannedDate, 'dd. MM. yyyy')} - ${mealType.name}`}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SelectField
              form={form}
              name="recipe"
              label="Recipe"
              options={recipes}
              placeholder="Select a recipe"
              searchPlaceholder="Search recipes..."
              emptyText="No recipes found"
              onSelect={(r) => form.setValue('name', r.name)}
              modal
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter meal name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SelectField
              form={form}
              name="mealType"
              label="Meal Type"
              options={mealTypes}
              placeholder="Select a meal type"
              searchPlaceholder="Search meal types..."
              emptyText="No meal types found"
              modal
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Additional Ingredients</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({
                      ingredient: { id: '', name: '' },
                      quantity: 1,
                      unit: { id: '', name: '' },
                    })
                  }
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Ingredient
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <div className="flex-1">
                    <SelectField
                      form={form}
                      name={
                        `additionalIngredients.${index}.ingredient` as const
                      }
                      options={ingredients}
                      placeholder="Select ingredient"
                      searchPlaceholder="Search ingredients..."
                      emptyText="No ingredients found"
                      modal
                    />
                  </div>
                  <div className="w-24">
                    <FormField
                      control={form.control}
                      name={`additionalIngredients.${index}.quantity` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              min="0.1"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-32">
                    <SelectField
                      form={form}
                      name={`additionalIngredients.${index}.unit` as const}
                      options={units}
                      placeholder="Unit"
                      modal
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <FormField
              control={form.control}
              name="plannedDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Planned Date</FormLabel>
                  <FormControl>
                    <DatePickerSingle
                      date={field.value}
                      setDate={(date) => field.onChange(date)}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input placeholder="Add any notes (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  isEditMode
                    ? updateMealMutation.isPending
                    : createMealMutation.isPending
                }
              >
                {isEditMode ? (
                  updateMealMutation.isPending ? (
                    <Spinner />
                  ) : (
                    'Save Changes'
                  )
                ) : createMealMutation.isPending ? (
                  <Spinner />
                ) : (
                  'Create Meal'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
