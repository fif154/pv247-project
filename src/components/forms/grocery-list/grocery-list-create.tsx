"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ImportIngredientsForm } from "./import-ingredients-form";
import { ListInformation } from "./list-information";

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

export const GroceryListCreateForm = () => {
    const form = useForm<GroceryListFormValues>({
        resolver: zodResolver(groceryListFormSchema),
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
                <ImportIngredientsForm />
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
