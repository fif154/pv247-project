import { IListMealsUseCase } from "@/server/application/use-cases/meals/list-meals.use-case";

export const listMealsController =
    (listMealsUseCase: IListMealsUseCase) => async () => {
        return listMealsUseCase();
    };

export type IListMealsController = ReturnType<typeof listMealsController>;
