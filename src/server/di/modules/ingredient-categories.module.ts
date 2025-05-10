import { createModule } from '@evyweb/ioctopus';

import { IngredientCategoriesRepository } from '@/server/infrastructure/repositories/ingredient-categories.repository';

import { createCategoryUseCase } from '@/server/application/use-cases/ingredient-categories/create-category.use-case';
import { listCategoriesUseCase } from '@/server/application/use-cases/ingredient-categories/list-categories.use-case';

import { createCategoryController } from '@/server/controllers/ingredient-categories/create-category.controller';
import { listCategoriesController } from '@/server/controllers/ingredient-categories/list-categories.controller';

import { DI_SYMBOLS } from '../types';

export function createIngredientCategoriesModule() {
  const categoriesModule = createModule();

  categoriesModule
    .bind(DI_SYMBOLS.IIngredientCategoriesRepository)
    .toClass(IngredientCategoriesRepository, [
      DI_SYMBOLS.ITransactionManagerService,
    ]);

  categoriesModule
    .bind(DI_SYMBOLS.ICreateCategoryUseCase)
    .toHigherOrderFunction(createCategoryUseCase, [
      DI_SYMBOLS.IIngredientCategoriesRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  categoriesModule
    .bind(DI_SYMBOLS.IListCategoriesUseCase)
    .toHigherOrderFunction(listCategoriesUseCase, [
      DI_SYMBOLS.IIngredientCategoriesRepository,
    ]);

  categoriesModule
    .bind(DI_SYMBOLS.ICreateCategoryController)
    .toHigherOrderFunction(createCategoryController, [
      DI_SYMBOLS.ICreateCategoryUseCase,
    ]);

  categoriesModule
    .bind(DI_SYMBOLS.IListCategoriesController)
    .toHigherOrderFunction(listCategoriesController, [
      DI_SYMBOLS.IListCategoriesUseCase,
    ]);

  return categoriesModule;
}
