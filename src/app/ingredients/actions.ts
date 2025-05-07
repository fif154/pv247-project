"use server";

import { getInjection } from "@/server/di/container";
import { revalidatePath } from "next/cache";
import { Ingredient } from "../auth/ingredients/schema";

export async function createIngredientAction(data: Omit<Ingredient, "id">) {
    try {
        const ingredientController = getInjection(
            "ICreateIngredientController"
        );
        ingredientController(data);
        revalidatePath("/ingredients");
    } catch (err) {
        // TODO: handle errors
        return {
            error: "An error occurred while creating the ingredient",
            err,
        };
    }
}

export async function getIngredientAction(id: string) {
    try {
        const ingredientController = getInjection("IGetIngredientController");
        return await ingredientController(id);
    } catch (err) {
        // TODO: handle errors
        return {
            error: "An error occurred while fetching the ingredient",
            err,
        };
    }
}

export async function updateIngredientAction(
    id: string,
    data: Partial<Ingredient>
) {
    try {
        const ingredientController = getInjection(
            "IUpdateIngredientController"
        );
        const res = await ingredientController(id, data);
        revalidatePath("/ingredients");
        return res;
    } catch (err) {
        // TODO: handle errors
        return {
            error: "An error occurred while updating the ingredient",
            err,
        };
    }
}

export async function deleteIngredientAction(id: string) {
    try {
        const ingredientController = getInjection(
            "IDeleteIngredientController"
        );
        await ingredientController(id);
        revalidatePath("/ingredients");
    } catch (err) {
        return {
            error: "An error occurred while deleting the ingredient",
            err,
        };
    }
}

export async function listIngredientsAction(shouldThrow = false) {
    try {
        const ingredientController = getInjection("IListIngredientsController");
        const res = await ingredientController();

        return res;
    } catch (err) {
        if (shouldThrow) {
            throw err;
        }

        return {
            error: "An error occurred while listing the ingredients",
            err,
        };
    }
}
