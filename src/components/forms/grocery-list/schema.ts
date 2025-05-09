import { z } from "zod";

export const ingredientSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: "Name is required." }),
    quantity: z.coerce.number().min(1, { message: "Quantity is required." }),
    unit: z.object({
        id: z.string(),
        name: z.string(),
    }),
    category: z.object({
        id: z.string(),
        name: z.string(),
    }),
});
export type IngredientFormValues = z.infer<typeof ingredientSchema>;

export const groceryListFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "List name must be at least 2 characters." }),
    dateRange: z.object({
        from: z.date(),
        to: z.date(),
    }),

    selectedRecipes: z.array(z.string()).optional(),
    selectedMealPlans: z.array(z.string()).optional(),
    manualIngredients: z.array(ingredientSchema).optional(),

    // TODO: support this so that the user can exclude some of the imported ingredients
    // excludedItems: z.array(z.string()).optional(),
    // items: z
    //     .array(
    //         z.object({
    //             name: z.string().min(1, { message: "Item name is required." }),
    //             quantity: z
    //                 .string()
    //                 .min(1, { message: "Quantity is required." }),
    //             unit: z.string().optional(),
    //             category: z.string(),
    //             checked: z.boolean(),
    //             source: z.string().optional(),
    //         })
    //     )
    //     .min(1, { message: "At least one item is required." }),
});

export type GroceryListFormValues = z.infer<typeof groceryListFormSchema>;
