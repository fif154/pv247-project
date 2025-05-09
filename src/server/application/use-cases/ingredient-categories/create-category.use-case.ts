import { IIngredientCategoriesRepository } from "@/server/application/repositories/ingredient-categories.repository.interface";
import { InputParseError } from "@/server/entities/errors/common";
import { CreateIngredientCategory } from "@/server/entities/models/ingredient-category";

export const createCategoryUseCase =
    (categoriesRepository: IIngredientCategoriesRepository) =>
    async (input: CreateIngredientCategory) => {
        const existingCategory = await categoriesRepository.getCategoryByName(
            input.name
        );
        if (existingCategory) {
            throw new InputParseError("Category with this name already exists");
        }

        return categoriesRepository.createCategory(input);
    };

export type ICreateCategoryUseCase = ReturnType<typeof createCategoryUseCase>;
