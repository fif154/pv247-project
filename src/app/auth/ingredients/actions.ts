'use server';

import { auth } from '@/auth';
import { getInjection } from '@/server/di/container';
import { NotFoundError, InputParseError } from '@/server/entities/errors/common';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

// List all ingredients
export async function listIngredientsAction() {
  try {
    const listIngredientsController = getInjection('IListIngredientsController');
    return await listIngredientsController();
  } catch (error: unknown) {
    console.error('Error listing ingredients:', error);
    return { error: 'Failed to list ingredients', err: error };
  }
}

// Get a single ingredient by ID
export async function getIngredientAction(id: string) {
  try {
    const getIngredientController = getInjection('IGetIngredientController');
    return await getIngredientController(id);
  } catch (error: unknown) {
    if (error instanceof NotFoundError) {
      notFound();
    }
    throw error;
  }
}

// Create a new ingredient
export async function createIngredientAction(data: {
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  protein: number;
  carbs: number;
  fat: number; 
  calories: number;
  baseMacroQuantity: number;
  categoryId?: string | null;
  unit: string;
}) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error('Not authenticated');
    }

    const createIngredientController = getInjection('ICreateIngredientController');
    
    // Format data according to controller requirements
    const ingredientData = {
      name: data.name,
      description: data.description || null,
      createdBy: session.user.id,
      imageUrl: data.imageUrl || null,
      protein: data.protein,
      carbs: data.carbs,
      fats: data.fat, // Map fat to fats
      calories: data.calories,
      baseMacroQuantity: data.baseMacroQuantity,
      categoryId: data.categoryId || null,
      deletedAt: null,
    };
    
    const result = await createIngredientController(ingredientData);
    revalidatePath('/auth/ingredients');
    return result;
  } catch (error: unknown) {
    console.error('Error creating ingredient:', error);
    if (error instanceof InputParseError) {
      return { error: error.message, code: 'VALIDATION_ERROR' };
    }
    return { error: 'Failed to create ingredient', code: 'UNKNOWN_ERROR' };
  }
}

// Update an ingredient
export async function updateIngredientAction(
  id: string,
  data: Partial<{
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    protein: number;
    carbs: number;
    fats: number; 
    calories: number;
    baseMacroQuantity: number;
    categoryId?: string | null;
  }>
) {
  try {
    const updateIngredientController = getInjection('IUpdateIngredientController');
    
    // Ensure we're passing the right data format
    const updateData = {
      ...data,
      // Handle any field mappings here if needed
    };
    
    await updateIngredientController(id, updateData);
    revalidatePath('/auth/ingredients');
    return { success: true };
  } catch (error: unknown) {
    console.error('Error updating ingredient:', error);
    if (error instanceof InputParseError) {
      return { error: error.message, code: 'VALIDATION_ERROR' };
    }
    return { error: 'Failed to update ingredient', code: 'UNKNOWN_ERROR' };
  }
}

// Delete an ingredient
export async function deleteIngredientAction(id: string) {
  try {
    const deleteIngredientController = getInjection('IDeleteIngredientController');
    await deleteIngredientController(id);
    revalidatePath('/auth/ingredients');
    return { success: true };
  } catch (error: unknown) {
    console.error('Error deleting ingredient:', error);
    return { error: 'Failed to delete ingredient', code: 'UNKNOWN_ERROR' };
  }
}

// List categories
export async function listCategoriesAction() {
  try {
    const listCategoriesController = getInjection('IListCategoriesController');
    return await listCategoriesController();
  } catch (error: unknown) {
    console.error('Error listing categories:', error);
    return { error: 'Failed to list categories', err: error };
  }
}