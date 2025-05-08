import { z } from "zod";

export const IngredientSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    unit: z.string().min(1, "Unit is required"),
    calories: z.number().min(0, "Calories must be non-negative"),
    protein: z.number().min(0, "Protein must be non-negative"),
    carbs: z.number().min(0, "Carbs must be non-negative"),
    fat: z.number().min(0, "Fat must be non-negative"),
});

export type Ingredient = z.infer<typeof IngredientSchema>;
