import { Meal } from '@/server/entities/models/meal';

export type Macros = {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
};

const getMacroInGrams = (
  quantity: number,
  gramsPerUnit: number,
  macro: number,
  baseMacroQuantity: number
) => {
  const amountInGrams = quantity * gramsPerUnit;
  return macro * (amountInGrams / baseMacroQuantity);
};

export const calculateMacrosForMeal = (meal: Meal): Macros => {
  const res: Macros = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  };

  const allIngredients = [
    ...(meal.recipe?.ingredients ?? []),
    ...(meal.additionalIngredients ?? []),
  ];

  allIngredients.forEach((recipeIngredient) => {
    if (recipeIngredient.ingredient) {
      res.calories += getMacroInGrams(
        +recipeIngredient.quantity,
        +recipeIngredient.unit!.gramsPerUnit,
        +recipeIngredient.ingredient.calories!,
        +recipeIngredient.ingredient.baseMacroQuantity
      );
      res.protein += getMacroInGrams(
        +recipeIngredient.quantity,
        +recipeIngredient.unit!.gramsPerUnit,
        +recipeIngredient.ingredient.protein!,
        +recipeIngredient.ingredient.baseMacroQuantity
      );
      res.carbs += getMacroInGrams(
        +recipeIngredient.quantity,
        +recipeIngredient.unit!.gramsPerUnit,
        +recipeIngredient.ingredient.carbs!,
        +recipeIngredient.ingredient.baseMacroQuantity
      );
      res.fats += getMacroInGrams(
        +recipeIngredient.quantity,
        +recipeIngredient.unit!.gramsPerUnit,
        +recipeIngredient.ingredient.fats!,
        +recipeIngredient.ingredient.baseMacroQuantity
      );
    }
  });
  return res;
};
