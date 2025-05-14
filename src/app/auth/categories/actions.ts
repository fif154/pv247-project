'use server';

import { getInjection } from '@/server/di/container';
import { revalidatePath } from 'next/cache';

export async function listCategories() {
  const listCategoriesController = getInjection('IListCategoriesController');
  return listCategoriesController();
}

export async function createCategory(input: {
  name: string;
  description: string | null;
}) {
  const createCategoryController = getInjection('ICreateCategoryController');
  const result = await createCategoryController(input);
  revalidatePath('/categories');
  return result;
}
