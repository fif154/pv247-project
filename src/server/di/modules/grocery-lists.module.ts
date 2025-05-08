import { createModule } from "@evyweb/ioctopus";

import { GroceryListItemsRepository } from "@/server/infrastructure/repositories/grocery-list-items.repository";
import { GroceryListsRepository } from "@/server/infrastructure/repositories/grocery-lists.repository";
import { GroceryListService } from "@/server/infrastructure/services/grocery-list.service";

import { createGroceryListUseCase } from "@/server/application/use-cases/grocery-lists/create-grocery-list.use-case";
import { deleteGroceryListItemUseCase } from "@/server/application/use-cases/grocery-lists/delete-grocery-list-item.use-case";
import { getGroceryListUseCase } from "@/server/application/use-cases/grocery-lists/get-grocery-list.use-case";
import { listGroceryListsUseCase } from "@/server/application/use-cases/grocery-lists/list-grocery-lists.use-case";
import { markAllItemsBoughtUseCase } from "@/server/application/use-cases/grocery-lists/mark-all-items-bought.use-case";
import { updateGroceryListItemUseCase } from "@/server/application/use-cases/grocery-lists/update-grocery-list-item.use-case";

import { createGroceryListController } from "@/server/controllers/grocery-lists/create-grocery-list.controller";
import { deleteGroceryListItemController } from "@/server/controllers/grocery-lists/delete-grocery-list-item.controller";
import { getGroceryListController } from "@/server/controllers/grocery-lists/get-grocery-list.controller";
import { listGroceryListsController } from "@/server/controllers/grocery-lists/list-grocery-lists.controller";
import { markAllItemsBoughtController } from "@/server/controllers/grocery-lists/mark-all-items-bought.controller";
import { updateGroceryListItemController } from "@/server/controllers/grocery-lists/update-grocery-list-item.controller";

import { DI_SYMBOLS } from "../types";

export function createGroceryListsModule() {
    const groceryListsModule = createModule();

    groceryListsModule
        .bind(DI_SYMBOLS.IGroceryListsRepository)
        .toClass(GroceryListsRepository, [
            DI_SYMBOLS.ITransactionManagerService,
        ]);

    groceryListsModule
        .bind(DI_SYMBOLS.IGroceryListItemsRepository)
        .toClass(GroceryListItemsRepository, [
            DI_SYMBOLS.ITransactionManagerService,
        ]);

    groceryListsModule
        .bind(DI_SYMBOLS.IGroceryListService)
        .toClass(GroceryListService);

    groceryListsModule
        .bind(DI_SYMBOLS.ICreateGroceryListUseCase)
        .toHigherOrderFunction(createGroceryListUseCase, [
            DI_SYMBOLS.IGroceryListsRepository,
            DI_SYMBOLS.IGroceryListItemsRepository,
            DI_SYMBOLS.IRecipesRepository,
            DI_SYMBOLS.IIngredientsRepository,
            DI_SYMBOLS.IMealPlansRepository,
            DI_SYMBOLS.IGroceryListService,
        ]);

    groceryListsModule
        .bind(DI_SYMBOLS.IListGroceryListsUseCase)
        .toHigherOrderFunction(listGroceryListsUseCase, [
            DI_SYMBOLS.IGroceryListsRepository,
        ]);

    groceryListsModule
        .bind(DI_SYMBOLS.IGetGroceryListUseCase)
        .toHigherOrderFunction(getGroceryListUseCase, [
            DI_SYMBOLS.IGroceryListsRepository,
        ]);

    groceryListsModule
        .bind(DI_SYMBOLS.IUpdateGroceryListItemUseCase)
        .toHigherOrderFunction(updateGroceryListItemUseCase, [
            DI_SYMBOLS.IGroceryListItemsRepository,
        ]);

    groceryListsModule
        .bind(DI_SYMBOLS.IDeleteGroceryListItemUseCase)
        .toHigherOrderFunction(deleteGroceryListItemUseCase, [
            DI_SYMBOLS.IGroceryListItemsRepository,
        ]);

    groceryListsModule
        .bind(DI_SYMBOLS.IMarkAllItemsBoughtUseCase)
        .toHigherOrderFunction(markAllItemsBoughtUseCase, [
            DI_SYMBOLS.IGroceryListItemsRepository,
        ]);

    groceryListsModule
        .bind(DI_SYMBOLS.ICreateGroceryListController)
        .toHigherOrderFunction(createGroceryListController, [
            DI_SYMBOLS.ICreateGroceryListUseCase,
            DI_SYMBOLS.ITransactionManagerService,
        ]);

    groceryListsModule
        .bind(DI_SYMBOLS.IListGroceryListsController)
        .toHigherOrderFunction(listGroceryListsController, [
            DI_SYMBOLS.IListGroceryListsUseCase,
        ]);

    groceryListsModule
        .bind(DI_SYMBOLS.IGetGroceryListController)
        .toHigherOrderFunction(getGroceryListController, [
            DI_SYMBOLS.IGetGroceryListUseCase,
        ]);

    groceryListsModule
        .bind(DI_SYMBOLS.IUpdateGroceryListItemController)
        .toHigherOrderFunction(updateGroceryListItemController, [
            DI_SYMBOLS.IUpdateGroceryListItemUseCase,
            DI_SYMBOLS.ITransactionManagerService,
        ]);

    groceryListsModule
        .bind(DI_SYMBOLS.IDeleteGroceryListItemController)
        .toHigherOrderFunction(deleteGroceryListItemController, [
            DI_SYMBOLS.IDeleteGroceryListItemUseCase,
            DI_SYMBOLS.ITransactionManagerService,
        ]);

    groceryListsModule
        .bind(DI_SYMBOLS.IMarkAllItemsBoughtController)
        .toHigherOrderFunction(markAllItemsBoughtController, [
            DI_SYMBOLS.IMarkAllItemsBoughtUseCase,
            DI_SYMBOLS.ITransactionManagerService,
        ]);

    return groceryListsModule;
}
