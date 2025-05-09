import { groceryListItems } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";
import { TModelWithRelations } from "../utils";

export type GroceryListItem = TModelWithRelations<"groceryListItems">;
export type CreateGroceryListItem = InferInsertModel<typeof groceryListItems>;
