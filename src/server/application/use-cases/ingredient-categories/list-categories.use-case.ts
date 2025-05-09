import { auth } from "@/auth";
import { IIngredientCategoriesRepository } from "@/server/application/repositories/ingredient-categories.repository.interface";
import { NotFoundError } from "@/server/entities/errors/common";

export const listCategoriesUseCase =
    (categoriesRepository: IIngredientCategoriesRepository) => async () => {
        const user = (await auth())?.user;
        if (!user) {
            throw new NotFoundError("User not found");
        }

        return categoriesRepository.listCategories(user.id);
    };

export type IListCategoriesUseCase = ReturnType<typeof listCategoriesUseCase>;
