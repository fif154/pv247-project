import { auth } from "@/auth";
import { IGroceryListItemsRepository } from "@/server/application/repositories/grocery-list-items.repository.interface";
import { NotFoundError } from "@/server/entities/errors/common";

export const deleteGroceryListItemUseCase =
    (groceryListItemsRepository: IGroceryListItemsRepository) =>
    async (id: string) => {
        const user = (await auth())?.user;
        if (!user) {
            throw new NotFoundError("User not found");
        }

        await groceryListItemsRepository.deleteGroceryListItem(id);
    };

export type IDeleteGroceryListItemUseCase = ReturnType<
    typeof deleteGroceryListItemUseCase
>;
