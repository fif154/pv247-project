import { ITransactionService } from '../../services/transaction.service.interface';
import { IAddIngredientToMealUseCase } from '../../use-cases/meal-additional-ingredients/add-ingredient-to-meal.use-case';

export const addIngredientToMealController =
  (
    addIngredientToMealUseCase: IAddIngredientToMealUseCase,
    transactionService: ITransactionService
  ) =>
  async (
    mealId: string,
    ingredientId: string,
    quantity: number,
    unitId: string
  ): Promise<void> => {
    await transactionService.runInTransaction(async () => {
      await addIngredientToMealUseCase(mealId, ingredientId, quantity, unitId);
    });
  };

export type IAddIngredientToMealController = ReturnType<
  typeof addIngredientToMealController
>;
