"use server";

import { getInjection } from "@/server/di/container";
import { CreateMealPlan } from "@/server/entities/models/meal-plan";
import { revalidatePath } from "next/cache";

export async function createMealPlanAction(
    data: CreateMealPlan,
    mealIds: string[]
) {
    const mealPlanController = getInjection("ICreateMealPlanController");
    await mealPlanController(data, mealIds);
    revalidatePath("/meal-plans");
    return { success: true };
}

export async function listMealPlansAction() {
    const mealPlanController = getInjection("IListMealPlansController");
    return await mealPlanController();
}
