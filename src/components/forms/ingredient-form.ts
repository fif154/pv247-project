import { z } from 'zod';

export const IngredientFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  imageUrl: z.string().url('Invalid URL').optional(),
  protein: z.number().min(0, 'Protein must be non-negative').optional(),
  carbs: z.number().min(0, 'Carbs must be non-negative').optional(),
  fats: z.number().min(0, 'Fats must be non-negative').optional(),
  calories: z.number().min(0, 'Calories must be non-negative').optional(),
  baseMacroQuantity: z
    .number()
    .min(1, 'Base macro quantity must be at least 1')
    .default(100),
});

export type IngredientFormValues = z.infer<typeof IngredientFormSchema>;
