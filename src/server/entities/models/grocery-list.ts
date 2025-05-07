import { groceryLists } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";
import { TModelWithRelations } from "../utils";

export type GroceryList = TModelWithRelations<"groceryLists">;
export type CreateGroceryList = InferInsertModel<typeof groceryLists>;
