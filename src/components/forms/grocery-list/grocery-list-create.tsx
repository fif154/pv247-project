"use client";

import { Form } from "@/components/ui/form";
import { MealPlan } from "@/server/entities/models/mealplan";
import { Recipe } from "@/server/entities/models/recipe";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddIngredientsManuallyForm } from "./add-ingredients-manually";
import { ImportIngredientsForm } from "./import-ingredients-form";
import { ListInformation } from "./list-information";

const ingredientSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: "Name is required." }),
    quantity: z.number().min(1, { message: "Quantity is required." }),
    unit: z.string().optional(),
    category: z.object({
        id: z.string(),
        name: z.string(),
    }),
});
export type IngredientFormValues = z.infer<typeof ingredientSchema>;

const groceryListFormSchema = z.object({
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

type Props = {
    recipes: Recipe[];
    mealPlans: MealPlan[];
};

export const GroceryListCreateForm = (props: Props) => {
    const form = useForm<GroceryListFormValues>({
        resolver: zodResolver(groceryListFormSchema),
        defaultValues: {
            manualIngredients: [
                {
                    name: "",
                    quantity: 1,
                    unit: "",
                },
            ],
        },
    });

    const { handleSubmit } = form;

    const onSubmit = (data: GroceryListFormValues) => {
        console.log("Form submitted:", data);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 p-4"
            >
                <ListInformation />
                <ImportIngredientsForm {...props} />
                <AddIngredientsManuallyForm />
                <button
                    type="submit"
                    className="bg-coral text-white py-2 px-4 rounded-md"
                >
                    Create List
                </button>
            </form>
        </Form>
    );
};
