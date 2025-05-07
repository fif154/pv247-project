import { ingredientCategories } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";
import { TModelWithRelations } from "../utils";

export type IngredientCategory = TModelWithRelations<"ingredientCategories">;
export type CreateIngredientCategory = InferInsertModel<
    typeof ingredientCategories
>;
