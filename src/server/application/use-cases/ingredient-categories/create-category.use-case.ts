import { IIngredientCategoriesRepository } from "@/server/application/repositories/ingredient-categories.repository.interface";
import { InputParseError } from "@/server/entities/errors/common";

export const createCategoryUseCase =
    (categoriesRepository: IIngredientCategoriesRepository) =>
    async (input: {
        name: string;
        description: string | null;
        createdBy: string;
    }) => {
        const existingCategory = await categoriesRepository.getCategoryByName(
            input.name
        );
        if (existingCategory) {
            throw new InputParseError("Category with this name already exists");
        }

        return categoriesRepository.createCategory(input);
    };

export type ICreateCategoryUseCase = ReturnType<typeof createCategoryUseCase>;
