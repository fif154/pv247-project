import { ITransactionManagerService } from "@/server/application/services/transaction-manager.service.interface";
import { ICreateMealPlanUseCase } from "@/server/application/use-cases/meal-plans/create-meal-plan.use-case";
import { CreateMealPlan } from "@/server/entities/models/meal-plan";

export const createMealPlanController =
    (
        createMealPlanUseCase: ICreateMealPlanUseCase,
        transactionManagerService: ITransactionManagerService
    ) =>
    async (input: CreateMealPlan, mealIds: string[]) => {
        return transactionManagerService.startTransaction(async (tx) => {
            try {
                return await createMealPlanUseCase(input, mealIds, tx);
            } catch (error) {
                tx.rollback();
                throw error;
            }
        });
    };

export type ICreateMealPlanController = ReturnType<
    typeof createMealPlanController
>;
