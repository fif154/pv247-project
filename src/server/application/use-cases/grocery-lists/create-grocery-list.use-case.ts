import { auth } from "@/auth";
import { GroceryListFormValues } from "@/components/forms/grocery-list/schema";
import { IGroceryListItemsRepository } from "@/server/application/repositories/grocery-list-items.repository.interface";
import { IGroceryListsRepository } from "@/server/application/repositories/grocery-lists.repository.interface";
import { IIngredientsRepository } from "@/server/application/repositories/ingredients.repository.interface";
import { IRecipesRepository } from "@/server/application/repositories/recipes.repository.interface";
import { NotFoundError } from "@/server/entities/errors/common";

// TODO: this should be done in a transaction
export const createGroceryListUseCase =
    (
        groceryListsRepository: IGroceryListsRepository,
        groceryListItemsRepository: IGroceryListItemsRepository,
        recipesRepository: IRecipesRepository,
        ingredientsRepository: IIngredientsRepository
    ) =>
    // TODO: typing the transaction as any is not great. However, in the
    // clean architecture template, they are doing it just like this.
    // If we have more time, we should try to type it properly.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (input: GroceryListFormValues, tx?: any) => {
        const user = (await auth())?.user;
        if (!user) {
            throw new NotFoundError("User not found");
        }

        const groceryList = await groceryListsRepository.createGroceryList(
            {
                name: input.name,
                groupId: "default", // TODO: get from user's context
                createdBy: user.id,
                fromDate: input.dateRange.from,
                toDate: input.dateRange.to,
            },
            tx
        );

        if (input.selectedRecipes?.length) {
            const recipes = await recipesRepository.getRecipesByIds(
                input.selectedRecipes,
                tx
            );

            const allListItems = [];
            for (const recipe of recipes) {
                if (recipe?.ingredients) {
                    const items = recipe.ingredients.map((ingredient) => ({
                        groceryListId: groceryList.id,
                        ingredientId: ingredient.ingredientId,
                        quantity: ingredient.quantity,
                        unitId: ingredient.unitId,
                        name: ingredient.ingredient?.name || "",
                        isBought: false,
                    }));
                    allListItems.push(...items);
                }
            }

            await groceryListItemsRepository.createGroceryListItems(
                allListItems,
                tx
            );
        }

        if (input.manualIngredients?.length) {
            const items = await Promise.all(
                input.manualIngredients.map(async (ingredient) => {
                    console.log("ingredient", ingredient);
                    let ingredientId = ingredient.id;
                    if (!ingredientId) {
                        console.log(ingredientId);
                        ingredientId = (
                            await ingredientsRepository.createIngredient(
                                {
                                    name: ingredient.name,
                                    categoryId: ingredient.category.id,
                                    createdBy: user.id,
                                },
                                tx
                            )
                        ).id;
                    }

                    return {
                        groceryListId: groceryList.id,
                        ingredientId,
                        quantity: ingredient.quantity,
                        unitId: ingredient.unit?.id,
                        name: ingredient.name,
                        isBought: false,
                    };
                })
            );

            await groceryListItemsRepository.createGroceryListItems(items, tx);
        }

        return groceryList;
    };

export type ICreateGroceryListUseCase = ReturnType<
    typeof createGroceryListUseCase
>;
