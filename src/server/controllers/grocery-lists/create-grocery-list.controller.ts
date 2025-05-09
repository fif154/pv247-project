import {
    groceryListFormSchema,
    GroceryListFormValues,
} from "@/components/forms/grocery-list/schema";
import { ITransactionManagerService } from "@/server/application/services/transaction-manager.service.interface";
import { ICreateGroceryListUseCase } from "@/server/application/use-cases/grocery-lists/create-grocery-list.use-case";

export const createGroceryListController =
    (
        createGroceryListUseCase: ICreateGroceryListUseCase,
        transactionManagerService: ITransactionManagerService
    ) =>
    async (input: GroceryListFormValues) => {
        const validatedInput = groceryListFormSchema.parse(input);

        return transactionManagerService.startTransaction(async (tx) => {
            try {
                return await createGroceryListUseCase(validatedInput, tx);
            } catch (error) {
                console.error("Error creating grocery list:", error);
                tx.rollback();
            }
        });
    };

export type ICreateGroceryListController = ReturnType<
    typeof createGroceryListController
>;
