import { auth } from "@/auth";
import { IGroceryListsRepository } from "@/server/application/repositories/grocery-lists.repository.interface";
import { NotFoundError } from "@/server/entities/errors/common";

export const getGroceryListUseCase =
    (groceryListsRepository: IGroceryListsRepository) => async (id: string) => {
        const user = (await auth())?.user;
        if (!user) {
            throw new NotFoundError("User not found");
        }

        const groceryList = await groceryListsRepository.getGroceryListById(id);
        if (!groceryList) {
            throw new NotFoundError("Grocery list not found");
        }

        return groceryList;
    };

export type IGetGroceryListUseCase = ReturnType<typeof getGroceryListUseCase>;
