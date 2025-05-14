import { auth } from '@/auth';
import { ingredientSchema } from '@/components/forms/grocery-list/schema';
import { Transaction } from '@/db';
import { IGroceryListItemsRepository } from '@/server/application/repositories/grocery-list-items.repository.interface';
import { IGroceryListsRepository } from '@/server/application/repositories/grocery-lists.repository.interface';
import { IIngredientsRepository } from '@/server/application/repositories/ingredients.repository.interface';
import { AuthenticationError } from '@/server/entities/errors/auth';
import { NotFoundError } from '@/server/entities/errors/common';
import {
  CreateGroceryListItem,
  GroceryListItem,
} from '@/server/entities/models/grocery-list-item';
import { z } from 'zod';
import { IGroceryListService } from '../../services/grocery-list.service.interface';
import { IGroupService } from '../../services/group.service.interface';
import { IIngredientService } from '../../services/ingredient.service.interface';

export const addGroceryListItemsSchema = z.object({
  groceryListId: z.string(),
  items: z.array(ingredientSchema),
});

const getGroceryListKey = (ingredientId: string, unitId: string) =>
  `${ingredientId}-${unitId}`;

export type AddGroceryListItemsInput = z.infer<
  typeof addGroceryListItemsSchema
>;

export const addGroceryListItemsUseCase =
  (
    groceryListsRepository: IGroceryListsRepository,
    groceryListItemsRepository: IGroceryListItemsRepository,
    ingredientsRepository: IIngredientsRepository,
    groceryListService: IGroceryListService,
    ingredientService: IIngredientService,
    groupService: IGroupService
  ) =>
  async (input: AddGroceryListItemsInput, tx?: Transaction) => {
    const session = await auth();
    const user = session?.user ?? null;
    const groceryList = await groceryListsRepository.getGroceryListById(
      input.groceryListId
    );

    if (!user) {
      throw new AuthenticationError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User is not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    if (!groceryList) {
      throw new NotFoundError('Grocery list not found');
    }

    if (groceryList.groupId !== user.groupId) {
      throw new NotFoundError('Grocery list not found');
    }

    const itemsToCreate: CreateGroceryListItem[] = [];

    for (const item of input.items) {
      const ingredientId = await groceryListService.processIngredient(
        {
          ingredientId: item.id,
          ingredientName: item.name,
          categoryId: item.category.id,
        },
        user!.id,
        user.groupId,
        ingredientsRepository,
        tx
      );

      itemsToCreate.push({
        groceryListId: input.groceryListId,
        ingredientId,
        quantity: item.quantity,
        unitId: item.unit.id,
        isBought: false,
      });
    }

    const combinedItems = ingredientService.combine(itemsToCreate);

    const groceryListIngredients = (
      await groceryListItemsRepository.getGroceryListItemsByGroceryListId(
        input.groceryListId,
        tx
      )
    ).reduce(
      (acc, item) => {
        acc[getGroceryListKey(item.ingredientId, item.unitId!)] = item;
        return acc;
      },
      {} as Record<string, GroceryListItem>
    );
    const ingredientsToCreate = combinedItems.filter(
      (item) =>
        !groceryListIngredients[
          getGroceryListKey(item.ingredientId, item.unitId!)
        ]
    );

    const created = await groceryListItemsRepository.createGroceryListItems(
      ingredientsToCreate,
      tx
    );

    const ingredientsToUpdate = combinedItems
      .filter(
        (item) =>
          groceryListIngredients[
            getGroceryListKey(item.ingredientId, item.unitId!)
          ]
      )
      .map((item) => ({
        ...item,
        quantity:
          item.quantity +
          groceryListIngredients[
            getGroceryListKey(item.ingredientId, item.unitId!)
          ].quantity,
      }));

    const updated: CreateGroceryListItem[] = [];
    for (const item of ingredientsToUpdate) {
      const updatedItem =
        await groceryListItemsRepository.updateGroceryListItem(
          groceryListIngredients[
            getGroceryListKey(item.ingredientId, item.unitId!)
          ].id,
          {
            isBought: false,
            quantity: item.quantity,
          },
          tx
        );
      updated.push(updatedItem);
    }

    return [...created, ...updated];
  };

export type IAddGroceryListItemsUseCase = ReturnType<
  typeof addGroceryListItemsUseCase
>;
