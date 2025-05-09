import { CreateGroceryListItem } from "@/server/entities/models/grocery-list-item";

export interface IGroceryListService {
    combineIngredients(
        ingredients: CreateGroceryListItem[]
    ): CreateGroceryListItem[];
}
