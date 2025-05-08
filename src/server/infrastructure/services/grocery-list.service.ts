import { IGroceryListService } from "@/server/application/services/grocery-list.service.interface";
import { CreateGroceryListItem } from "@/server/entities/models/grocery-list-item";

export class GroceryListService implements IGroceryListService {
    public combineIngredients(
        groceryListItems: CreateGroceryListItem[]
    ): CreateGroceryListItem[] {
        const combinedIngredients: Record<string, CreateGroceryListItem> = {};

        for (const item of groceryListItems) {
            const key = `${item.ingredientId}-${item.unitId}`;
            if (combinedIngredients[key]) {
                combinedIngredients[key].quantity += item.quantity;
            } else {
                combinedIngredients[key] = { ...item };
            }
        }

        return Object.values(combinedIngredients);
    }
}
