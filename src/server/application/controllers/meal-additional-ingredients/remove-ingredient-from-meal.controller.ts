import { ITransactionService } from '../../services/transaction.service.interface';
import { IRemoveIngredientFromMealUseCase } from '../../use-cases/meal-additional-ingredients/remove-ingredient-from-meal.use-case';

export const removeIngredientFromMealController =
  (
    removeIngredientFromMealUseCase: IRemoveIngredientFromMealUseCase,
    transactionService: ITransactionService
  ) =>
  async (mealId: string, ingredientId: string): Promise<void> => {
    await transactionService.runInTransaction(async () => {
      await removeIngredientFromMealUseCase(mealId, ingredientId);
    });
  };

export type IRemoveIngredientFromMealController = ReturnType<
  typeof removeIngredientFromMealController
>;
