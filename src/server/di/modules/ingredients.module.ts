import { createModule } from '@evyweb/ioctopus';
import { createIngredientUseCase } from '../../application/use-cases/ingredients/create-ingredient.use-case';
import { deleteIngredientUseCase } from '../../application/use-cases/ingredients/delete-ingredient.use-case';
import { getIngredientUseCase } from '../../application/use-cases/ingredients/get-ingredient.use-case';
import { listIngredientsUseCase } from '../../application/use-cases/ingredients/list-ingredients.use-case';
import { updateIngredientUseCase } from '../../application/use-cases/ingredients/update-ingredient.use-case';
import { createIngredientController } from '../../controllers/ingredients/create-ingredient.controller';
import { deleteIngredientController } from '../../controllers/ingredients/delete-ingredient.controller';
import { getIngredientController } from '../../controllers/ingredients/get-ingredient.controller';
import { listIngredientsController } from '../../controllers/ingredients/list-ingredients.controller';
import { updateIngredientController } from '../../controllers/ingredients/update-ingredient.controller';
import { IngredientsRepository } from '../../infrastructure/repositories/ingredients.repository';
import { DI_SYMBOLS } from '../types';

export const createIngredientsModule = () => {
  const ingredientsModule = createModule();

  ingredientsModule
    .bind(DI_SYMBOLS.IIngredientsRepository)
    .toClass(IngredientsRepository, [DI_SYMBOLS.ITransactionManagerService]);

  ingredientsModule
    .bind(DI_SYMBOLS.ICreateIngredientUseCase)
    .toHigherOrderFunction(createIngredientUseCase, [
      DI_SYMBOLS.IIngredientsRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  ingredientsModule
    .bind(DI_SYMBOLS.IUpdateIngredientUseCase)
    .toHigherOrderFunction(updateIngredientUseCase, [
      DI_SYMBOLS.IIngredientsRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  ingredientsModule
    .bind(DI_SYMBOLS.IDeleteIngredientUseCase)
    .toHigherOrderFunction(deleteIngredientUseCase, [
      DI_SYMBOLS.IIngredientsRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  ingredientsModule
    .bind(DI_SYMBOLS.IListIngredientsUseCase)
    .toHigherOrderFunction(listIngredientsUseCase, [
      DI_SYMBOLS.IIngredientsRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  ingredientsModule
    .bind(DI_SYMBOLS.IGetIngredientUseCase)
    .toHigherOrderFunction(getIngredientUseCase, [
      DI_SYMBOLS.IIngredientsRepository,
      DI_SYMBOLS.IGroupService,
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
};
