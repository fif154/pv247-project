import { ITransactionManagerService } from "@/server/application/services/transaction-manager.service.interface";
import { ICreateMealUseCase } from "@/server/application/use-cases/meals/create-meal.use-case";
import {
    CreateMeal,
    CreateMealAdditionalIngredient,
} from "@/server/entities/models/meal";

export const createMealController =
    (
        createMealUseCase: ICreateMealUseCase,
        transactionManagerService: ITransactionManagerService
    ) =>
    async (
        input: CreateMeal,
        additionalIngredients?: CreateMealAdditionalIngredient[]
    ) => {
        return transactionManagerService.startTransaction(async (tx) => {
            try {
                return await createMealUseCase(
                    input,
                    additionalIngredients,
                    tx
                );
            } catch (error) {
                tx.rollback();
                throw error;
            }
        });
    };

export type ICreateMealController = ReturnType<typeof createMealController>;
