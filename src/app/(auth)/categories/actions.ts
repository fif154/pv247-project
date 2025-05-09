'use server';

import { IListCategoriesController } from '@/server/controllers/categories/list-categories.controller';
import { container } from '@/server/di/container';
import { DI_SYMBOLS } from '@/server/di/types';
import { revalidatePath } from 'next/cache';

export async function listCategories() {
  const listCategoriesController = container.get<IListCategoriesController>(
    DI_SYMBOLS.IListCategoriesController
  );
  return listCategoriesController();
}

export async function createCategory(input: {
  name: string;
  description: string | null;
}) {
  const createCategoryController = container.get<ICreateCategoryController>(
    DI_SYMBOLS.ICreateCategoryController
  );
  const result = await createCategoryController(input);
  revalidatePath('/categories');
  return result;
}
