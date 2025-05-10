import {
  AddGroceryListItemsInput,
  addGroceryListItemsSchema,
  IAddGroceryListItemsUseCase,
} from '@/server/application/use-cases/grocery-lists/add-grocery-list-items.use-case';

export const addGroceryListItemsController =
  (addGroceryListItemsUseCase: IAddGroceryListItemsUseCase) =>
  async (input: AddGroceryListItemsInput) => {
    return addGroceryListItemsUseCase(addGroceryListItemsSchema.parse(input));
  };

export type IAddGroceryListItemsController = ReturnType<
  typeof addGroceryListItemsController
>;
