import { ITransactionManagerService } from "@/server/application/services/transaction-manager.service.interface";
import { IDeleteGroceryListItemUseCase } from "@/server/application/use-cases/grocery-lists/delete-grocery-list-item.use-case";

export const deleteGroceryListItemController =
    (
        deleteGroceryListItemUseCase: IDeleteGroceryListItemUseCase,
        transactionManagerService: ITransactionManagerService
    ) =>
    async (id: string) => {
        return transactionManagerService.startTransaction(async (tx) => {
            try {
                await deleteGroceryListItemUseCase(id);
            } catch (error) {
                tx.rollback();
                throw error;
            }
        });
    };

export type IDeleteGroceryListItemController = ReturnType<
    typeof deleteGroceryListItemController
>;
