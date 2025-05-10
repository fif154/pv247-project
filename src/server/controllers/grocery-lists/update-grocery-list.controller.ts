import {
  IUpdateGroceryListUseCase,
  UpdateGroceryListInput,
} from '@/server/application/use-cases/grocery-lists/update-grocery-list.use-case';

export const updateGroceryListController =
  (updateGroceryListUseCase: IUpdateGroceryListUseCase) =>
  async (id: string, input: UpdateGroceryListInput) => {
    return updateGroceryListUseCase(id, input);
  };

export type IUpdateGroceryListController = ReturnType<
  typeof updateGroceryListController
>;
