import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { showSuccessToast, showErrorToast } from '@/utils/toast';
import {
  createRecipe,
  updateRecipe,
  saveRecipeIngredients,
  deleteRecipe,
} from '@/app/auth/recipes/actions';
import { Recipe } from '@/server/entities/models/recipe';

type RecipeFormValues = {
  name: string;
  description?: string;
  servings: number;
  image?: string;
  ingredients?: Array<{
    id?: string;
    ingredientId?: string;
    ingredientName: string;
    quantity: number;
    unitId: string;
  }>;
  newIngredient?: {
    ingredientName?: string;
    quantity: number;
    unitId?: string;
  };
};

type SubmitRecipeParams = {
  data: RecipeFormValues;
  imageFile: File | null;
  imagePreview: string | null;
  isEditMode: boolean;
  recipe?: Recipe;
  fields: Array<{
    id?: string;
    ingredientId?: string;
    ingredientName: string;
    quantity: number;
    unitId: string;
  }>;
};

async function uploadImageIfNeeded(
  imageFile: File | null,
  imagePreview: string | null
): Promise<string> {
  let imageUrl = imagePreview || '';

  if (imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const imageData = await response.json();
    imageUrl = imageData.url;
  }

  return imageUrl;
}

function prepareIngredientsPayload(
  ingredients: Array<{
    id?: string;
    ingredientId?: string;
    ingredientName: string;
    quantity: number;
    unitId: string;
  }>
) {
  return ingredients.map((ing) => {
    const isNewIngredient = ing.ingredientId?.startsWith('temp-');

    if (isNewIngredient) {
      // For new ingredients, send the name but no IDs
      return {
        name: ing.ingredientName,
        quantity: ing.quantity,
        unitId: ing.unitId,
      };
    } else {
      // For existing ingredients, send the IDs
      return {
        id: ing.id,
        ingredientId: ing.ingredientId,
        quantity: ing.quantity,
        unitId: ing.unitId,
      };
    }
  });
}

export function useSubmitRecipeMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      data,
      imageFile,
      imagePreview,
      isEditMode,
      recipe,
      fields,
    }: SubmitRecipeParams) => {
      try {
        const imageUrl = await uploadImageIfNeeded(imageFile, imagePreview);

        const recipeData = {
          name: data.name,
          description: data.description || '',
          servings: data.servings,
          image: imageUrl,
        };

        let recipeId;

        if (isEditMode && recipe) {
          await updateRecipe({
            id: recipe.id,
            ...recipeData,
          });
          recipeId = recipe.id;
        } else {
          const newRecipe = await createRecipe(recipeData);
          recipeId = newRecipe.id;
        }

        if (recipeId) {
          const ingredientPayload = prepareIngredientsPayload(fields);
          await saveRecipeIngredients(recipeId, ingredientPayload);
        }

        return { success: true, recipeId };
      } catch (error) {
        console.error('Error saving recipe:', error);
        throw error;
      }
    },
    onSuccess: (_, variables) => {
      showSuccessToast(
        `Recipe ${variables.isEditMode ? 'updated' : 'created'} successfully`
      );
      router.push('/auth/recipes');
    },
    onError: (error, variables) => {
      console.error('Error saving recipe:', error);
      showErrorToast(
        `Failed to ${variables.isEditMode ? 'update' : 'create'} recipe`
      );
    },
  });
}

export function useDeleteRecipeMutation(recipeId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteRecipe({ id: recipeId }),
    onSuccess: () => {
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['recipes'] });

      showSuccessToast('Recipe deleted successfully');
      router.push('/auth/recipes');
    },
    onError: (error) => {
      console.error('Failed to delete recipe:', error);
    },
  });
}
