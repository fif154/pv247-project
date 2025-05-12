export type RecipeIngredient = {
  id: string;
  recipeId: string;
  ingredientId: string;
  quantity: number;
  unitId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateRecipeIngredient = {
  recipeId: string;
  ingredientId: string;
  quantity: number;
  unitId: string;
};