import { IGetGroceryListUseCase } from '@/server/application/use-cases/grocery-lists/get-grocery-list.use-case';

export const getGroceryListController =
  (getGroceryListUseCase: IGetGroceryListUseCase) => async (id: string) => {
    return getGroceryListUseCase(id);
  };

export type IGetGroceryListController = ReturnType<
  typeof getGroceryListController
>;
