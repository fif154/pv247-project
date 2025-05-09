"use server";

import { getInjection } from "@/server/di/container";
import { NotFoundError } from "@/server/entities/errors/common";
import { ValidationError } from "@/server/entities/errors/validation";
import {
    CreateMeal,
    CreateMealAdditionalIngredient,
} from "@/server/entities/models/meal";
import { revalidatePath } from "next/cache";

export async function createMealAction(
    data: CreateMeal,
    additionalIngredients?: CreateMealAdditionalIngredient[]
) {
    try {
        const mealController = getInjection("ICreateMealController");
        await mealController(data, additionalIngredients);
        revalidatePath("/meals");
        return { success: true };
    } catch (error: unknown) {
        if (error instanceof NotFoundError) {
            return { success: false, error: "Resource not found", status: 404 };
        }
        if (error instanceof ValidationError) {
            return { success: false, error: error.message, status: 400 };
        }
        return { success: false, error: "Internal server error", status: 500 };
    }
}

export async function listMealsAction() {
    try {
        const mealController = getInjection("IListMealsController");
        return await mealController();
    } catch (error: unknown) {
        if (error instanceof NotFoundError) {
            return { success: false, error: "Resource not found", status: 404 };
        }
        if (error instanceof ValidationError) {
            return { success: false, error: error.message, status: 400 };
        }
        return { success: false, error: "Internal server error", status: 500 };
    }
}
