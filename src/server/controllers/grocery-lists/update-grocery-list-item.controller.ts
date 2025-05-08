import { ITransactionManagerService } from "@/server/application/services/transaction-manager.service.interface";
import { IUpdateGroceryListItemUseCase } from "@/server/application/use-cases/grocery-lists/update-grocery-list-item.use-case";
import { GroceryListItem } from "@/server/entities/models/grocery-list-item";

export const updateGroceryListItemController =
    (
        updateGroceryListItemUseCase: IUpdateGroceryListItemUseCase,
        transactionManagerService: ITransactionManagerService
    ) =>
    async (
        id: string,
        input: Partial<
            Omit<
                GroceryListItem,
                "id" | "createdBy" | "createdAt" | "updatedAt"
            >
        >
    ) => {
        return transactionManagerService.startTransaction(async (tx) => {
            try {
                return await updateGroceryListItemUseCase(id, input);
            } catch (error) {
                tx.rollback();
                throw error;
            }
        });
    };

export type IUpdateGroceryListItemController = ReturnType<
    typeof updateGroceryListItemController
>;
