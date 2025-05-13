import { auth } from '@/auth';
import { GroceryListFormValues } from '@/components/forms/grocery-list/schema';
import { IGroceryListItemsRepository } from '@/server/application/repositories/grocery-list-items.repository.interface';
import { IGroceryListsRepository } from '@/server/application/repositories/grocery-lists.repository.interface';
import { IIngredientsRepository } from '@/server/application/repositories/ingredients.repository.interface';
import { IRecipesRepository } from '@/server/application/repositories/recipes.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { CreateGroceryListItem } from '@/server/entities/models/grocery-list-item';
import { Recipe } from '@/server/entities/models/recipe';
import { isDateInRange } from '@/utils/date';
import { DateRange } from 'react-day-picker';
import { IMealPlansRepository } from '../../repositories/meal-plans.repository.interface';
import { IGroceryListService } from '../../services/grocery-list.service.interface';
import { IGroupService } from '../../services/group.service.interface';
import { IIngredientService } from '../../services/ingredient.service.interface';

export const createGroceryListUseCase =
  (
    groceryListsRepository: IGroceryListsRepository,
    groceryListItemsRepository: IGroceryListItemsRepository,
    recipesRepository: IRecipesRepository,
    ingredientsRepository: IIngredientsRepository,
    mealPlansRepository: IMealPlansRepository,
    groceryListService: IGroceryListService,
    ingredientService: IIngredientService,
    groupService: IGroupService
  ) =>
  async (
    input: GroceryListFormValues,
    mealDateRange?: DateRange,
    // TODO: typing the transaction as any is not great. However, in the
    // clean architecture template, they are doing it just like this.
    // If we have more time, we should try to type it properly.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tx?: any
  ) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User is not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    const groceryList = await groceryListsRepository.createGroceryList(
      {
        name: input.name,
        groupId: user.groupId,
        createdBy: user!.id,
        fromDate: input.dateRange.from,
        toDate: input.dateRange.to,
      },
      tx
    );

    const allRecipes: Recipe[] = [];
    if (input.selectedRecipes?.length) {
      const recipes = await recipesRepository.getRecipesByIds(
        input.selectedRecipes,
        tx
      );
      allRecipes.push(...recipes);
    }

    if (input.selectedMealPlans?.length) {
      const mealPlans = await mealPlansRepository.getMealPlansByIds(
        input.selectedMealPlans,
        tx
      );

      const allMeals = mealPlans.flatMap(
        (mealPlan) => mealPlan.meals?.map((m) => m.meal).filter(Boolean) || []
      );

      const filteredMeals = mealDateRange
        ? allMeals.filter((meal) =>
            isDateInRange(meal?.plannedDate, mealDateRange)
          )
        : allMeals;

      const allRecipesFromMealPlans =
        filteredMeals.map((m) => m!.recipe).filter(Boolean) || [];

      // This can't be null or undefined because we are filtering these values out
      allRecipes.push(...(allRecipesFromMealPlans as Recipe[]));
    }

    const allIngredients: CreateGroceryListItem[] = [];
    for (const recipe of allRecipes) {
      if (recipe?.ingredients) {
        const items = recipe.ingredients.map((ingredient) => ({
          groceryListId: groceryList.id,
          ingredientId: ingredient.ingredientId,
          quantity: ingredient.quantity,
          unitId: ingredient.unitId,
          isBought: false,
        }));
        allIngredients.push(...items);
      }
    }

    if (input.manualIngredients?.length) {
      const items: CreateGroceryListItem[] = await Promise.all(
        input.manualIngredients.map(async (ingredient) => {
          const ingredientId = await groceryListService.processIngredient(
            {
              ingredientId: ingredient.id,
              ingredientName: ingredient.name,
              categoryId: ingredient.category.id,
            },
            user!.id,
            user.groupId,
            ingredientsRepository,
            tx
          );

          return {
            groceryListId: groceryList.id,
            ingredientId,
            quantity: ingredient.quantity,
            unitId: ingredient.unit?.id,
            isBought: false,
          };
        })
      );

      allIngredients.push(...items);
    }

    const combinedIngredients = ingredientService.combine(allIngredients);

    try {
      await groceryListItemsRepository.createGroceryListItems(
        combinedIngredients,
        tx
      );
    } catch (error) {
      console.error('Error creating grocery list items:', error);
      throw new Error('Failed to create grocery list items');
    }

    return groceryList;
  };

export type ICreateGroceryListUseCase = ReturnType<
  typeof createGroceryListUseCase
>;
