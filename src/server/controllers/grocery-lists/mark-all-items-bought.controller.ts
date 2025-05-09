import { ITransactionManagerService } from "@/server/application/services/transaction-manager.service.interface";
import { IMarkAllItemsBoughtUseCase } from "@/server/application/use-cases/grocery-lists/mark-all-items-bought.use-case";

export const markAllItemsBoughtController =
    (
        markAllItemsBoughtUseCase: IMarkAllItemsBoughtUseCase,
        transactionManagerService: ITransactionManagerService
    ) =>
    async (groceryListId: string) => {
        return transactionManagerService.startTransaction(async (tx) => {
            try {
                return await markAllItemsBoughtUseCase(groceryListId);
            } catch (error) {
                tx.rollback();
                throw error;
            }
        });
    };

export type IMarkAllItemsBoughtController = ReturnType<
    typeof markAllItemsBoughtController
>;
