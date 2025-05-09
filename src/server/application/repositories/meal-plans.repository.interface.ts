import { Transaction } from "@/db";
import { CreateMealPlan, MealPlan } from "@/server/entities/models/meal-plan";

export interface IMealPlansRepository {
    createMealPlan(
        input: CreateMealPlan,
        mealIds: string[],
        tx?: Transaction
    ): Promise<MealPlan>;
    getMealPlanById(id: string, tx?: Transaction): Promise<MealPlan | null>;
    getMealPlansByIds(ids: string[], tx?: Transaction): Promise<MealPlan[]>;
    updateMealPlan(
        id: string,
        input: Partial<
            Omit<MealPlan, "id" | "createdBy" | "createdAt" | "updatedAt">
        >,
        mealIds?: string[],
        tx?: Transaction
    ): Promise<MealPlan>;
    deleteMealPlan(id: string, tx?: Transaction): Promise<void>;
    listMealPlans(userId: string): Promise<MealPlan[]>;
}
