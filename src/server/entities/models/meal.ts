import { mealAdditionalIngredients, meals } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";
import { TModelWithRelations } from "../utils";

export type Meal = TModelWithRelations<"meals">;
export type CreateMeal = InferInsertModel<typeof meals>;

export type MealAdditionalIngredient =
    TModelWithRelations<"mealAdditionalIngredients">;
export type CreateMealAdditionalIngredient = InferInsertModel<
    typeof mealAdditionalIngredients
>;
