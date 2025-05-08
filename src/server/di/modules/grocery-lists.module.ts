import { createModule } from "@evyweb/ioctopus";

import { GroceryListItemsRepository } from "@/server/infrastructure/repositories/grocery-list-items.repository";
import { GroceryListsRepository } from "@/server/infrastructure/repositories/grocery-lists.repository";
import { GroceryListService } from "@/server/infrastructure/services/grocery-list.service";

import { createGroceryListUseCase } from "@/server/application/use-cases/grocery-lists/create-grocery-list.use-case";
import { listGroceryListsUseCase } from "@/server/application/use-cases/grocery-lists/list-grocery-lists.use-case";

import { createGroceryListController } from "@/server/controllers/grocery-lists/create-grocery-list.controller";
import { listGroceryListsController } from "@/server/controllers/grocery-lists/list-grocery-lists.controller";

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

    return groceryListsModule;
}
