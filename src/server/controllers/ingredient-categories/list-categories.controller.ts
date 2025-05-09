import { IListCategoriesUseCase } from "@/server/application/use-cases/ingredient-categories/list-categories.use-case";

export const listCategoriesController =
    (listCategoriesUseCase: IListCategoriesUseCase) => async () => {
        return listCategoriesUseCase();
    };

export type IListCategoriesController = ReturnType<
    typeof listCategoriesController
>;
