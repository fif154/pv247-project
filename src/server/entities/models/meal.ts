import { meals } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";
import { TModelWithRelations } from "../utils";

export type Meal = TModelWithRelations<"meals">;
export type CreateMeal = InferInsertModel<typeof meals>;
