import { IListMealPlansUseCase } from "@/server/application/use-cases/meal-plans/list-meal-plans.use-case";

export const listMealPlansController =
    (listMealPlansUseCase: IListMealPlansUseCase) => async () => {
        return listMealPlansUseCase();
    };

export type IListMealPlansController = ReturnType<
    typeof listMealPlansController
>;
