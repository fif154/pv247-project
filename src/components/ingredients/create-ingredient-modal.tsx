'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useCreateIngredientMutation } from '@/mutations/ingredients';
import { Spinner } from '../ui/spinner';
import { useCategories } from '@/queries/categories';
import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

// Define the form schema matching the required fields
const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().optional().nullable(),
  imageUrl: z.string().url('Must be a valid URL').or(z.literal('')).nullable(),
  categoryId: z.string().optional().nullable(),
  protein: z.coerce.number().min(0, 'Must be non-negative'),
  carbs: z.coerce.number().min(0, 'Must be non-negative'),
  fat: z.coerce.number().min(0, 'Must be non-negative'),
  calories: z.coerce.number().min(0, 'Must be non-negative'),
  unit: z.string(),
  baseMacroQuantity: z.coerce.number().min(1, 'Must be at least 1'),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateIngredientModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();
  const createMutation = useCreateIngredientMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      imageUrl: '',
      categoryId: null,
      protein: 0,
      carbs: 0,
      fat: 0,
      calories: 0,
      unit: 'gram',
      baseMacroQuantity: 100,
    },
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

    const onSubmit = async (values: FormValues) => {
    try {
      await createMutation.mutateAsync({
        ...values,
        description: values.description || undefined,
        category: values.categoryId || '',
        imageUrl: values.imageUrl || null,
      });
      onClose();
    } catch (error) {
      console.error('Error creating ingredient:', error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Ingredient</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
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

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || 'none'}
                      onValueChange={(value) =>
                        field.onChange(value === 'none' ? null : value)
                      }
                      disabled={categoriesLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <div className="flex-1">
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
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="baseMacroQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference Quantity</FormLabel>
                      <div className="flex flex-col space-y-1">
                        <FormControl>
                          <Input {...field} type="number" min="1" />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">
                          All nutritional values are per this amount in grams
                          (default: 100g)
                        </p>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                name="fat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fat (g)</FormLabel>
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
              variant="coral"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? <Spinner /> : 'Create Ingredient'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
