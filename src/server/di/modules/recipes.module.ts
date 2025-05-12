import { createModule } from '@evyweb/ioctopus';

import { RecipesRepository } from '@/server/infrastructure/repositories/recipes.repository';
import { RecipeIngredientsRepository } from '@/server/infrastructure/repositories/recipe-ingredients.repository';

import { createRecipeUseCase } from '@/server/application/use-cases/recipes/create-recipe.use-case';
import { deleteRecipeUseCase } from '@/server/application/use-cases/recipes/delete-recipe.use-case';
import { getRecipeUseCase } from '@/server/application/use-cases/recipes/get-recipe.use-case';
import { listRecipesUseCase } from '@/server/application/use-cases/recipes/list-recipes.use-case';
import { updateRecipeUseCase } from '@/server/application/use-cases/recipes/update-recipe.use-case';
import { saveRecipeIngredientsUseCase } from '@/server/application/use-cases/recipes/save-recipe-ingredients.use-case';

import { createRecipeController } from '@/server/controllers/recipes/create-recipe.controller';
import { deleteRecipeController } from '@/server/controllers/recipes/delete-recipe.controller';
import { getRecipeController } from '@/server/controllers/recipes/get-recipe.controller';
import { listRecipesController } from '@/server/controllers/recipes/list-recipes.controller';
import { updateRecipeController } from '@/server/controllers/recipes/update-recipe.controller';
import { saveRecipeIngredientsController } from '@/server/controllers/recipes/save-recipe-ingredients.controller';

import { RecipeIngredientsService } from '@/server/infrastructure/services/recipe-ingredients.service';

import { DI_SYMBOLS } from '../types';

export function createRecipesModule() {
  const recipesModule = createModule();

  recipesModule
    .bind(DI_SYMBOLS.IRecipesRepository)
    .toClass(RecipesRepository, [DI_SYMBOLS.ITransactionManagerService]);

  recipesModule
    .bind(DI_SYMBOLS.ICreateRecipeUseCase)
    .toHigherOrderFunction(createRecipeUseCase, [
      DI_SYMBOLS.IRecipesRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  recipesModule
    .bind(DI_SYMBOLS.IUpdateRecipeUseCase)
    .toHigherOrderFunction(updateRecipeUseCase, [
      DI_SYMBOLS.IRecipesRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  recipesModule
    .bind(DI_SYMBOLS.IDeleteRecipeUseCase)
    .toHigherOrderFunction(deleteRecipeUseCase, [
      DI_SYMBOLS.IRecipesRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  recipesModule
    .bind(DI_SYMBOLS.IListRecipesUseCase)
    .toHigherOrderFunction(listRecipesUseCase, [
      DI_SYMBOLS.IRecipesRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  recipesModule
    .bind(DI_SYMBOLS.IGetRecipeUseCase)
    .toHigherOrderFunction(getRecipeUseCase, [
      DI_SYMBOLS.IRecipesRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  recipesModule
    .bind(DI_SYMBOLS.ICreateRecipeController)
    .toHigherOrderFunction(createRecipeController, [
      DI_SYMBOLS.ICreateRecipeUseCase,
    ]);

  recipesModule
    .bind(DI_SYMBOLS.IUpdateRecipeController)
    .toHigherOrderFunction(updateRecipeController, [
      DI_SYMBOLS.IUpdateRecipeUseCase,
    ]);

  recipesModule
    .bind(DI_SYMBOLS.IDeleteRecipeController)
    .toHigherOrderFunction(deleteRecipeController, [
      DI_SYMBOLS.IDeleteRecipeUseCase,
    ]);

  recipesModule
    .bind(DI_SYMBOLS.IListRecipesController)
    .toHigherOrderFunction(listRecipesController, [
      DI_SYMBOLS.IListRecipesUseCase,
    ]);

  recipesModule
    .bind(DI_SYMBOLS.IGetRecipeController)
    .toHigherOrderFunction(getRecipeController, [DI_SYMBOLS.IGetRecipeUseCase]);

  recipesModule
    .bind(DI_SYMBOLS.IRecipeIngredientsRepository)
    .toClass(RecipeIngredientsRepository, [
      DI_SYMBOLS.ITransactionManagerService,
    ]);

  recipesModule
    .bind(DI_SYMBOLS.IRecipeIngredientsService)
    .toClass(RecipeIngredientsService, []);

  recipesModule
    .bind(DI_SYMBOLS.ISaveRecipeIngredientsUseCase)
    .toHigherOrderFunction(saveRecipeIngredientsUseCase, [
      DI_SYMBOLS.IRecipesRepository,
      DI_SYMBOLS.IRecipeIngredientsRepository,
      DI_SYMBOLS.IIngredientsRepository,
      DI_SYMBOLS.IRecipeIngredientsService,
      DI_SYMBOLS.IGroupService,
    ]);

  recipesModule
    .bind(DI_SYMBOLS.ISaveRecipeIngredientsController)
    .toHigherOrderFunction(saveRecipeIngredientsController, [
      DI_SYMBOLS.ISaveRecipeIngredientsUseCase,
    ]);

  return recipesModule;
}
