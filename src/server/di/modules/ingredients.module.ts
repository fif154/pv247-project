import { createModule } from "@evyweb/ioctopus";

import { IngredientsRepository } from "@/server/infrastructure/repositories/ingredients.repository";

import { createIngredientUseCase } from "@/server/application/use-cases/ingredients/create-ingredient.use-case";
import { deleteIngredientUseCase } from "@/server/application/use-cases/ingredients/delete-ingredient.use-case";
import { getIngredientUseCase } from "@/server/application/use-cases/ingredients/get-ingredient.use-case";
import { listIngredientsUseCase } from "@/server/application/use-cases/ingredients/list-ingredients.use-case";
import { updateIngredientUseCase } from "@/server/application/use-cases/ingredients/update-ingredient.use-case";

import { createIngredientController } from "@/server/controllers/ingredients/create-ingredient.controller";
import { deleteIngredientController } from "@/server/controllers/ingredients/delete-ingredient.controller";
import { getIngredientController } from "@/server/controllers/ingredients/get-ingredient.controller";
import { listIngredientsController } from "@/server/controllers/ingredients/list-ingredients.controller";
import { updateIngredientController } from "@/server/controllers/ingredients/update-ingredient.controller";

import { DI_SYMBOLS } from "../types";

export function createIngredientsModule() {
    const ingredientsModule = createModule();

    ingredientsModule
        .bind(DI_SYMBOLS.IIngredientsRepository)
        .toClass(IngredientsRepository, [
            DI_SYMBOLS.ITransactionManagerService,
        ]);

    ingredientsModule
        .bind(DI_SYMBOLS.ICreateIngredientUseCase)
        .toHigherOrderFunction(createIngredientUseCase, [
            DI_SYMBOLS.IIngredientsRepository,
        ]);

    ingredientsModule
        .bind(DI_SYMBOLS.IUpdateIngredientUseCase)
        .toHigherOrderFunction(updateIngredientUseCase, [
            DI_SYMBOLS.IIngredientsRepository,
        ]);

    ingredientsModule
        .bind(DI_SYMBOLS.IDeleteIngredientUseCase)
        .toHigherOrderFunction(deleteIngredientUseCase, [
            DI_SYMBOLS.IIngredientsRepository,
        ]);

    ingredientsModule
        .bind(DI_SYMBOLS.IListIngredientsUseCase)
        .toHigherOrderFunction(listIngredientsUseCase, [
            DI_SYMBOLS.IIngredientsRepository,
        ]);

    ingredientsModule
        .bind(DI_SYMBOLS.IGetIngredientUseCase)
        .toHigherOrderFunction(getIngredientUseCase, [
            DI_SYMBOLS.IIngredientsRepository,
        ]);

    ingredientsModule
        .bind(DI_SYMBOLS.ICreateIngredientController)
        .toHigherOrderFunction(createIngredientController, [
            DI_SYMBOLS.ICreateIngredientUseCase,
        ]);

    ingredientsModule
        .bind(DI_SYMBOLS.IUpdateIngredientController)
        .toHigherOrderFunction(updateIngredientController, [
            DI_SYMBOLS.IUpdateIngredientUseCase,
        ]);

    ingredientsModule
        .bind(DI_SYMBOLS.IDeleteIngredientController)
        .toHigherOrderFunction(deleteIngredientController, [
            DI_SYMBOLS.IDeleteIngredientUseCase,
        ]);

    ingredientsModule
        .bind(DI_SYMBOLS.IListIngredientsController)
        .toHigherOrderFunction(listIngredientsController, [
            DI_SYMBOLS.IListIngredientsUseCase,
        ]);

    ingredientsModule
        .bind(DI_SYMBOLS.IGetIngredientController)
        .toHigherOrderFunction(getIngredientController, [
            DI_SYMBOLS.IGetIngredientUseCase,
        ]);

    return ingredientsModule;
}
