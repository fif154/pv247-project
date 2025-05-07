import { IListGroceryListsUseCase } from "@/server/application/use-cases/grocery-lists/list-grocery-lists.use-case";

export const listGroceryListsController =
    (listGroceryListsUseCase: IListGroceryListsUseCase) => async () => {
        return listGroceryListsUseCase();
    };

export type IListGroceryListsController = ReturnType<
    typeof listGroceryListsController
>;
