"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useCreateGroceryListMutation } from "@/mutations/grocery-lists";
import { MealPlan } from "@/server/entities/models/mealplan";
import { Recipe } from "@/server/entities/models/recipe";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddIngredientsManuallyForm } from "./add-ingredients-manually";
import { ImportIngredientsForm } from "./import-ingredients-form";
import { ListInformation } from "./list-information";
import { groceryListFormSchema, GroceryListFormValues } from "./schema";

type Props = {
    recipes: Recipe[];
    mealPlans: MealPlan[];
};

export const GroceryListCreateForm = (props: Props) => {
    const form = useForm<GroceryListFormValues>({
        resolver: zodResolver(groceryListFormSchema),
    });
    const createGroceryListMutation = useCreateGroceryListMutation();

    const { handleSubmit } = form;

    const onSubmit = async (data: GroceryListFormValues) => {
        await createGroceryListMutation.mutateAsync(data);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <ListInformation />
                <ImportIngredientsForm {...props} />
                <AddIngredientsManuallyForm />
                <Button
                    type="submit"
                    className="bg-coral text-white py-2 px-4 rounded-md"
                    disabled={createGroceryListMutation.isPending}
                >
                    {createGroceryListMutation.isPending ? (
                        <Spinner />
                    ) : (
                        "Create grocery list"
                    )}
                </Button>
            </form>
        </Form>
    );
};
