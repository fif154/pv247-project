'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { SelectField } from '../forms/select-field';
import { Ingredient } from '@/server/entities/models/ingredient';
import { useUpdateIngredientMutation } from '@/mutations/ingredients';
import { Spinner } from '../ui/spinner';
import { useCategories } from '@/queries/categories';

type IngredientFormValues = {
  name: string;
  description?: string;
  imageUrl?: string | null;
  categoryId?: {
    id: string;
    name: string;
  };
  protein?: number;
  carbs?: number;
  fats?: number;
  calories?: number;
  baseMacroQuantity: number; // Note: this is required
};

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().optional(),
  imageUrl: z.string().url('Must be a valid URL').optional().nullable(),
  categoryId: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .optional(),
  protein: z.coerce.number().min(0, 'Must be non-negative').optional(),
  carbs: z.coerce.number().min(0, 'Must be non-negative').optional(),
  fats: z.coerce.number().min(0, 'Must be non-negative').optional(),
  calories: z.coerce.number().min(0, 'Must be non-negative').optional(),
  baseMacroQuantity: z.coerce.number().min(1, 'Must be at least 1'),
});

export function EditIngredientForm({
  ingredient,
  onSuccess,
}: {
  ingredient: Ingredient;
  onSuccess?: () => void;
}) {
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();
  const updateMutation = useUpdateIngredientMutation();

  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ingredient.name,
      description: ingredient.description || undefined,
      imageUrl: ingredient.imageUrl || undefined,
      categoryId: ingredient.category || undefined,
      protein: ingredient.protein || undefined,
      carbs: ingredient.carbs || undefined,
      fats: ingredient.fats || undefined,
      calories: ingredient.calories || undefined,
      baseMacroQuantity: ingredient.baseMacroQuantity || 100,
    },
  });

  const onSubmit = async (values: IngredientFormValues) => {
    await updateMutation.mutateAsync({
      id: ingredient.id,
      data: {
        ...values,
        categoryId: values.categoryId?.id,
      },
    });

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SelectField
          form={form}
          name="categoryId"
          label="Category"
          options={categories}
          placeholder="Select a category"
          isLoading={categoriesLoading}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="calories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calories (kcal)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="baseMacroQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Base quantity (g)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="protein"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Protein (g)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="carbs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carbs (g)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fats"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fats (g)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? <Spinner /> : 'Save Changes'}
        </Button>
      </form>
    </Form>
  );
}
